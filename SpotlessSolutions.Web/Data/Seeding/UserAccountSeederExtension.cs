using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using SpotlessSolutions.Web.Data.Models;

namespace SpotlessSolutions.Web.Data.Seeding;

public static class UserAccountSeederExtension
{
    private static string GenerateString(int length)
    {
        const string dict = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKMNOPQRSTUVWXYZ1234567890";
        var result = "";

        for (var i = 0; i < length; i++)
        {
            result += dict[RandomNumberGenerator.GetInt32(0, dict.Length - 1)];
        }

        return result;
    }
    
    public static async Task InitializeAdminAccount(this DataContext context, UserManager<IdentityUser> user, ILogger logger)
    {
        var adminAccount = await context.UserData
            .FirstOrDefaultAsync(x => x.Role == UserRoles.Administrator);
        if (adminAccount != null)
        {
            logger.LogInformation("Administrator account already exist");
            return;
        }

        var identityUser = new IdentityUser
        {
            Email = "admin@topdown.com",
            EmailConfirmed = true,
            UserName = GenerateString(32)
        };
        var password = GenerateString(16);
        var userCreationResult = await user.CreateAsync(identityUser, password);
        if (!userCreationResult.Succeeded)
        {
            logger.LogError("An exception occured at creating user admin account. {e}", userCreationResult.Errors);
            return;
        }
        
        var userInformation = new UserData
        {
            FirstName = "Administrator",
            LastName = "Account",
            PhoneNumber = "+630000000000",
            Role = UserRoles.Administrator,
            UserId = identityUser.Id
        };
        await context.UserData.AddAsync(userInformation);
        await context.SaveChangesAsync();

        var accountPrompt = new StringBuilder();
        accountPrompt.AppendLine("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        accountPrompt.AppendLine("THIS IS YOUR ADMINISTRATOR ACCOUNT. WRITE DOWN THE");
        accountPrompt.AppendLine("INFORMATION IMMEDIATELY.");
        accountPrompt.AppendLine("EMAIL: admin@topdown.com");
        accountPrompt.AppendLine($"PASSWORD: {password}");
        accountPrompt.AppendLine("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");

        logger.LogInformation(accountPrompt.ToString());
    }
}
