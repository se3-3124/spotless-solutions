using System.Reflection;
using SpotlessSolutions.Web.Services.Services.Addons;
using SpotlessSolutions.Web.Services.Services.Builtin;

namespace SpotlessSolutions.Web.Services.Services;

public class ServiceRegistry : IServiceRegistry
{
    private readonly Dictionary<string, IService> _services;
    private readonly Dictionary<string, IAddon> _addOns;

    public ServiceRegistry()
    {
        _services = GetAllServices();
        _addOns = GetAllAddOns();
    }

    public ServiceDetails[] GetAllRegisteredServices()
    {
        return _services.Values
            .Select(x => new ServiceDetails
            {
                Id = x.GetId(),
                Description = x.GetDescription(),
                Name = x.GetName()
            })
            .ToArray();
    }

    public ServiceDetails[] GetAllAddons()
    {
        return _addOns.Values
            .Select(x => new ServiceDetails
            {
                Id = x.GetId(),
                Description = x.GetDescription(),
                Name = x.GetName()
            })
            .ToArray();
    }

    public string[] GetAllStandaloneAddonsServices()
    {
        return _addOns.Values
            .Where(x => x.IsStandalone())
            .Select(x => x.GetId())
            .ToArray();
    }

    public IService? GetActivatedServiceInstance(string id)
    {
        return _services.GetValueOrDefault(id);
    }

    public IAddon? GetActivatedAddonInstance(string id)
    {
        return _addOns.GetValueOrDefault(id);
    }

    private static Dictionary<string, IService> GetAllServices()
    {
        var assemblies = Assembly.GetExecutingAssembly().GetExportedTypes()
            .Where(x => !x.IsAbstract && x is { IsInterface: false, IsClass: true } &&
                        typeof(IService).IsAssignableFrom(x))
            .Select(Activator.CreateInstance)
            .Cast<IService>()
            .ToList();

        return assemblies.ToDictionary(service => service.GetId());
    }

    private static Dictionary<string, IAddon> GetAllAddOns()
    {
        var assemblies = Assembly.GetExecutingAssembly().GetExportedTypes()
            .Where(x => !x.IsAbstract && x is { IsClass: true, IsInterface: false } &&
                        typeof(IAddon).IsAssignableFrom(x))
            .Select(Activator.CreateInstance)
            .Cast<IAddon>()
            .ToList();

        return assemblies.ToDictionary(addon => addon.GetId());
    }
}
