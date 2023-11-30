using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;
using SpotlessSolutions.Web.Data;
using SpotlessSolutions.Web.Data.Models;
using SpotlessSolutions.Web.Services.Authentication.Session;
using SpotlessSolutions.Web.Services.Mailer;

namespace SpotlessSolutions.Web.Services.Authentication;

public class Authentication : IAuthentication
{
    private readonly DataContext _context;
    private readonly UserManager<IdentityUser> _user;
    private readonly ISessionIssuer _sessionIssuer;
    private readonly IMailer _mailer;

    public Authentication(DataContext context,
        UserManager<IdentityUser> user,
        ISessionIssuer sessionIssuer,
        IMailer mailer)
    {
        _context = context;
        _user = user;
        _sessionIssuer = sessionIssuer;
        _mailer = mailer;
    }
    
    public async Task<SessionToken?> Login(string email, string password)
    {
        var user = await _user.FindByEmailAsync(email);
        if (user == null)
        {
            return null;
        }

        var isPasswordValid = await _user.CheckPasswordAsync(user, password);
        if (!isPasswordValid)
        {
            return null;
        }

        return await _sessionIssuer.Sign(user);
    }

    public async Task<bool> Register(UserRegistrationData data)
    {
        var findUser = await _user.FindByEmailAsync(data.Email);
        if (findUser != null)
        {
            return false;
        }

        // Register email and password through UserManager
        var user = new IdentityUser
        {
            Email = data.Email,
            EmailConfirmed = false
        };
        var result = await _user.CreateAsync(user, data.Password);
        if (!result.Succeeded)
        {
            return false;
        }
        
        // Write the other information into the UserData table
        var userInformation = new UserData
        {
            FirstName = data.FirstName,
            LastName = data.LastName,
            PhoneNumber = data.PhoneNumber,
            Role = UserRoles.User,
            UserId = user.Id
        };
        await _context.UserData.AddAsync(userInformation);

        var emailConfirmationToken = await _user.GenerateEmailConfirmationTokenAsync(user);
        var code = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(emailConfirmationToken));
        var hostname = Environment.GetEnvironmentVariable("SITE_HOSTNAME");
        var emailSettings = new MailSettings
        {
            Recipient =
            {
                Address = user.Email,
                Name = $"{userInformation.LastName}, {userInformation.FirstName}"
            },
            Subject = "Account confirmation",
            Body = $"""
                    Confirm your account by clicking <a href="{hostname}/api/auth/confirm?t={code}">here</a>
                    """
        };

        await _mailer.Send(emailSettings);
        return true;
    }

    public async Task<bool> RequestForPasswordReset(string email)
    {
        var user = await _user.FindByEmailAsync(email);
        if (user == null)
        {
            return false;
        }

        var information = await _context.UserData
            .Include(x => x.User)
            .FirstAsync(x => x.User!.Id == user.Id);

        var passwordResetCode = await _user.GeneratePasswordResetTokenAsync(user);
        var code = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(passwordResetCode));

        var hostname = Environment.GetEnvironmentVariable("SITE_HOSTNAME");
        var emailSettings = new MailSettings
        {
            Recipient =
            {
                Address = user.Email!,
                Name = $"{information.LastName}, {information.FirstName}"
            },
            Subject = "Account Recovery",
            Body = $"""
                    Recover your account by clicking <a href="{hostname}/recovery/change?token={code}">here</a>.
                    """
        };

        await _mailer.Send(emailSettings);
        return true;
    }
}
