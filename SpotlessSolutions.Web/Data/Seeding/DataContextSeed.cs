using System.Reflection;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using SpotlessSolutions.Web.Services.Services;

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
        
        
        logger.LogInformation("Seeding services configuration...");
        try
        {
            await context.SeedServiceConfigurations();
        }
        catch (Exception ex)
        {
            logger.LogCritical("Seeding failed for services config! Exception: {e}", ex);
        }

        await context.SaveChangesAsync();
    }

    public static async Task FinalizeSeed(this WebApplication application)
    {
        var scope = application.Services.CreateScope();

        var context = scope.ServiceProvider.GetRequiredService<DataContext>();
        var registry = scope.ServiceProvider.GetRequiredService<IServiceRegistry>();
        var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();

        foreach (var service in registry.GetAllRegisteredServices())
        {
            var instance = registry.GetActivatedServiceInstance(service.Id);
            if (instance == null)
            {
                logger.LogWarning("No service found from id: {id}", service.Id);
                continue;
            }

            var config = await context.ServiceConfigs
                .FirstOrDefaultAsync(x => x.TargetingServiceId == service.Id);
            if (config == null)
            {
                logger.LogWarning("No service configuration found for: {id} This is harmless.", service.Id);
                continue;
            }

            instance.UpdateConfig(config.Name, config.Description, config.ServiceConfiguration);
        }
    }
}
