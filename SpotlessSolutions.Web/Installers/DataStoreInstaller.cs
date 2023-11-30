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
    }
}