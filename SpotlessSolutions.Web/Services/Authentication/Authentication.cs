using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Distributed;
using SpotlessSolutions.Web.Data;
using SpotlessSolutions.Web.Data.Models;
using SpotlessSolutions.Web.Extensions;
using SpotlessSolutions.Web.Security.Tokens.Session;
using SpotlessSolutions.Web.Services.Authentication.OAuth2;
using SpotlessSolutions.Web.Services.Mailer;

namespace SpotlessSolutions.Web.Services.Authentication;

public class Authentication : IAuthentication
{
    private readonly DataContext _context;
    private readonly IDistributedCache _cache;
    private readonly IMailer _mailer;
    private readonly ISessionIssuer _sessionIssuer;
    private readonly UserManager<IdentityUser> _user;

    public Authentication(DataContext context,
        IDistributedCache cache,
        IMailer mailer,
        ISessionIssuer sessionIssuer,
        UserManager<IdentityUser> user)
    {
        _context = context;
        _cache = cache;
        _user = user;
        _sessionIssuer = sessionIssuer;
        _mailer = mailer;
    }

    public async Task<AuthenticationResult?> Login(string email, string password)
    {
        var user = await _user.FindByEmailAsync(email);
        if (user == null)
        {
            return null;
        }

        var userData = await _context.UserData.FirstOrDefaultAsync(x => x.UserId == user.Id);
        if (userData == null)
        {
            return null;
        }

        var isPasswordValid = await _user.CheckPasswordAsync(user, password);
        if (!isPasswordValid)
        {
            return null;
        }

        var sessionTokens = await _sessionIssuer.Sign(user, userData);
        if (sessionTokens == null)
        {
            return null;
        }

        return new AuthenticationResult
        {
            Token = sessionTokens.Token,
            RefreshToken = sessionTokens.RefreshToken
        };
    }

    public async Task<bool> Register(UserRegistrationData data, bool sendConfirmationEmail = true)
    {
        var findUser = await _user.FindByEmailAsync(data.Email);
        if (findUser != null)
        {
            return false;
        }

        // Register email and password through UserManager
        var user = new IdentityUser
        {
            UserName = data.Email,
            Email = data.Email
        };
        var result = await _user.CreateAsync(user, data.Password);
        if (!result.Succeeded)
        {
            foreach (var e in result.Errors)
            {
                Console.WriteLine(e.Description);
            }
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
        
        // Store cache into the memory for validation purposes.
        await _cache.SetRecordAsync($"ect_{code}", new UserIdCache
        {
            Id = user.Id
        }, absoluteExpireTime: TimeSpan.FromMinutes(10));
        
        var hostname = Environment.GetEnvironmentVariable("SITE_HOSTNAME") ?? "";
        try
        {
            if (sendConfirmationEmail)
            {
                var emailSettings = new MailSettings
                {
                    Recipient = new MailSettings.UserData
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
            }
            await _context.SaveChangesAsync();
            return true;
        }
        catch
        {
            // Remove user when operation fails
            await _user.DeleteAsync(user);
            _context.UserData.Remove(userInformation);
            await _context.SaveChangesAsync();
            return false;
        }
    }

    public async Task<bool> VerifyEmail(string token)
    {
        var cache = await _cache.GetRecordAsync<UserIdCache>($"ect_{token}");
        if (cache == null)
        {
            return false;
        }

        var user = await _user.FindByIdAsync(cache.Id);
        if (user == null)
        {
            return false;
        }

        var verifyToken = Encoding.UTF8.GetString(WebEncoders.Base64UrlDecode(token));
        var result = await _user.ConfirmEmailAsync(user, verifyToken);

        if (result.Succeeded)
        {
            await _cache.RemoveAsync($"ect_{token}");
            return true;
        }

        return false;
    }

    public async Task<bool> RequestForPasswordReset(string email)
    {
        var user = await _user.FindByEmailAsync(email);
        if (user == null)
        {
            return false;
        }

        var information = await _context.UserData
            .FirstAsync(x => x.UserId == user.Id);

        var passwordResetCode = await _user.GeneratePasswordResetTokenAsync(user);
        var code = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(passwordResetCode));
        
        // Store the information into the cache
        await _cache.SetRecordAsync($"prt_{code}", new UserIdCache
        {
            Id = user.Id
        }, absoluteExpireTime: TimeSpan.FromMinutes(10));

        var hostname = Environment.GetEnvironmentVariable("SITE_HOSTNAME") ?? "";
        try
        {
            var emailSettings = new MailSettings
            {
                Recipient = new MailSettings.UserData
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
        catch
        {
            return false;
        }
    }

    public async Task<bool> ResetPassword(string token, string newPassword)
    {
        var userData = await _cache.GetRecordAsync<UserIdCache>($"prt_{token}");
        if (userData == null)
        {
            return false;
        }

        var user = await _user.FindByIdAsync(userData.Id);
        if (user == null)
        {
            return false;
        }

        var resetToken = Encoding.UTF8.GetString(WebEncoders.Base64UrlDecode(token));
        var result = await _user.ResetPasswordAsync(user, resetToken, newPassword);
        if (!result.Succeeded)
        {
            return false;
        }

        await _cache.RemoveAsync($"prt_{token}");
        return true;
    }

    public async Task<bool> RegisterOAuth2User(AccountBindingType source, ExternalUserAccountInformation data)
    {
        var findUser = await _user.FindByEmailAsync(data.Email);
        if (findUser != null)
        {
            return false;
        }

        // Register email and password through UserManager
        var user = new IdentityUser
        {
            UserName = data.Email,
            Email = data.Email,
            EmailConfirmed = true
        };
        
        var dummyPassword = WebEncoders.Base64UrlEncode(RandomNumberGenerator.GetBytes(64));
        var result = await _user.CreateAsync(user, dummyPassword);
        if (!result.Succeeded)
        {
            foreach (var e in result.Errors)
            {
                Console.WriteLine(e.Description);
            }
            return false;
        }

        // Write the other information into the UserData table
        var userInformation = new UserData
        {
            FirstName = data.FirstName,
            LastName = data.LastName,
            PhoneNumber = "unset",
            Role = UserRoles.User,
            UserId = user.Id
        };
        await _context.UserData.AddAsync(userInformation);

        var credentialBinding = new AccountBinding
        {
            AccountId = data.Id,
            Type = source,
            UserDataId = userInformation.Id
        };
        await _context.Bindings.AddAsync(credentialBinding);
        await _context.SaveChangesAsync();

        return true;
    }

    public async Task<SessionToken?> LoginOAuth2User(AccountBindingType source, string id)
    {
        var credentialSource = await _context.Bindings
            .Include(x => x.User)
            .FirstOrDefaultAsync(x => x.AccountId == id && x.Type == source);

        // Account cannot be found
        if (credentialSource == null)
        {
            return null;
        }

        var user = await _user.FindByIdAsync(credentialSource.User.UserId!);
        if (user == null)
        {
            return null;
        }
        
        var userData = await _context.UserData.FirstOrDefaultAsync(x => x.UserId == user.Id);
        if (userData == null)
        {
            return null;
        }

        var tokens = await _sessionIssuer.Sign(user, userData);
        if (tokens == null)
        {
            return null;
        }

        return new SessionToken
        {
            RefreshToken = tokens.RefreshToken,
            Token = tokens.Token
        };
    }

    public async Task<SessionToken?> RefreshSession(string token, string refreshToken)
    {
        var session = await _sessionIssuer.Refresh(token, refreshToken);
        return session != null
            ? new SessionToken
            {
                RefreshToken = session.RefreshToken,
                Token = session.Token
            }
            : null;
    }
}
