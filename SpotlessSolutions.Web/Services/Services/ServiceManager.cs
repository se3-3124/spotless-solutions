using Microsoft.EntityFrameworkCore;
using SpotlessSolutions.Web.Data;

namespace SpotlessSolutions.Web.Services.Services;

public class ServiceManager : IServiceManager
{
    private readonly DataContext _context;
    private readonly IServiceRegistry _registry;
    private readonly ILogger<ServiceManager> _logger;

    public ServiceManager(DataContext context, IServiceRegistry registry, ILogger<ServiceManager> logger)
    {
        _context = context;
        _registry = registry;
        _logger = logger;
    }

    public async Task<bool> UpdateServiceConfiguration(ServiceConfig update)
    {
        var service = _registry.GetActivatedServiceInstance(update.TargetingServiceId);
        if (service == null)
        {
            return false;
        }

        var serviceConfig = await _context.ServiceConfigs
            .FirstOrDefaultAsync(x => x.TargetingServiceId == update.TargetingServiceId);

        // Bail out if there's no configuration value loaded on the database. This ensures that we won't
        // be applying weird changes.
        if (serviceConfig == null)
        {
            return false;
        }

        // Update configuration values
        var patchConfig = update.Config.Split(",")
            .Select(x =>
            {
                var configItem = x.Split(":");
                return (configItem[0], configItem[1], configItem[2]);
            });
            
        var configuration = serviceConfig.ServiceConfiguration.Split(",")
            .Select(config => config.Split(":"))
            .ToDictionary(data => data[0], data => (data[1], data[2]));

        foreach (var (key, type, value) in patchConfig)
        {
            if (!configuration.ContainsKey(key))
            {
                continue;
            }

            var configurationItem = configuration.GetValueOrDefault(key);
            if (configurationItem.Item1 != type)
            {
                continue;
            }

            configuration[key] = (configurationItem.Item1, value);
        }
        
        var configurationList = new List<string>();
        foreach (var (key, value) in configuration)
        {
            configurationList.Add($"{key}:{value.Item1}:{value.Item2}");
        }

        try
        {
            serviceConfig.Name = update.Name;
            serviceConfig.Description = update.Description;
            serviceConfig.ServiceConfiguration = string.Join(",", configurationList);

            _context.ServiceConfigs.Update(serviceConfig);
            await _context.SaveChangesAsync();
            
            // Update the config
            service.UpdateConfig(update.Name, update.Description, serviceConfig.ServiceConfiguration);
        }
        catch (Exception ex)
        {
            _logger.LogInformation("Saving of updated service configuration failed: {ex}", ex);
            return false;
        }

        return true;
    }
}
