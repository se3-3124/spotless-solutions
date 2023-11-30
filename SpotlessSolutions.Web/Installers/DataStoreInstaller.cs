using System.Runtime.CompilerServices;
using Microsoft.EntityFrameworkCore;
using SpotlessSolutions.Web.Data;

namespace SpotlessSolutions.Web.Installers;

public static class DataStoreInstaller
{
    public static void InstallDataContexts(this IServiceCollection services, IConfiguration configuration)
    {
        var dataContextConnectionString = configuration.GetConnectionString("PrimaryContext");
        if (string.IsNullOrEmpty(dataContextConnectionString))
        {
            throw new Exception("Primary database is not configured.");
        }
        
        services.AddDbContext<DataContext>(options =>
        {
            options.UseNpgsql(dataContextConnectionString);
        });

        var redisConnectionString = configuration.GetConnectionString("Redis");
        if (string.IsNullOrEmpty(redisConnectionString))
        {
            throw new Exception("Redis cache is not configured.");
        }

        services.AddStackExchangeRedisCache(options =>
        {
            options.Configuration = redisConnectionString;
            options.InstanceName = "SpotlessSolution_";
        });
    }
}
