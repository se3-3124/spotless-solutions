using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using SpotlessSolutions.Web.Data.Models;

namespace SpotlessSolutions.Web.Data.Seeding;

public static class UserAccountSeederExtension
{
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
            UserName = "admin@topdown.com"
        };
        var password = GeneratePassword();
        var userCreationResult = await user.CreateAsync(identityUser, password);
        if (!userCreationResult.Succeeded)
        {
            logger.LogError("An exception occured at creating user admin account. {e}", userCreationResult.Errors);
            foreach (var ex in userCreationResult.Errors)
            {
                logger.LogError("{code}: {description}", ex.Code, ex.Description);
            }
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
    
    public static string GeneratePassword()
    {
        const string uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const string lowercase = "abcdefghijklmnopqrstuvwxyz";
        const string numbers = "0123456789";
        const string symbols = "#!@$%^&*";
        var result = "";

        var uppercaseCount = RandomNumberGenerator.GetInt32(1, 5);
        for (var i = 0; i < uppercaseCount; i++)
        {
            result += uppercase[RandomNumberGenerator.GetInt32(0, uppercase.Length - 1)];
        }

        for (var i = 0; i < 10 - uppercaseCount; i++)
        {
            result += lowercase[RandomNumberGenerator.GetInt32(0, lowercase.Length - 1)];
        }

        for (var i = 0; i < 4; i++)
        {
            result += numbers[RandomNumberGenerator.GetInt32(0, numbers.Length - 1)];
        }

        for (var i = 0; i < 2; i++)
        {
            result += symbols[RandomNumberGenerator.GetInt32(0, symbols.Length - 1)];
        }
        
        // Finally shuffle the end result
        var final = result.ToCharArray()
            .OrderBy(_ => RandomNumberGenerator.GetInt32(100, 999))
            .ToArray();

        return new string(final);
    }
}
