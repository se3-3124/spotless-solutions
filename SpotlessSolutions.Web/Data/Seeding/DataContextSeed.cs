using Microsoft.AspNetCore.Identity;

namespace SpotlessSolutions.Web.Data.Seeding;

public static class DataContextSeed
{
    public static async Task ApplySeed(this WebApplication application)
    {
        var scope = application.Services.CreateScope();

        var context = scope.ServiceProvider.GetRequiredService<DataContext>();
        var userAccount = scope.ServiceProvider.GetRequiredService<UserManager<IdentityUser>>();
        var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
        
        logger.LogInformation("Seeding administrator account...");
        try
        {
            await context.InitializeAdminAccount(userAccount, logger);
        }
        catch (Exception ex)
        {
            logger.LogCritical("Seeding failed! Exception: {e}", ex);
        }

        await context.SaveChangesAsync();
    }
}
