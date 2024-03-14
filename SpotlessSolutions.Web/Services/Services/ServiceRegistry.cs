using SpotlessSolutions.ServiceLibrarySdk;

namespace SpotlessSolutions.Web.Services.Services;

public class ServiceRegistry : IServiceRegistry
{
    private readonly Dictionary<string, IService> _services = GetAllExportedServices();

    public IEnumerable<ServiceDetails> GetAllServices()
    {
        return _services.Values
            .Select(x => new ServiceDetails
            {
                Id = x.GetId(),
                Description = x.GetDescription(),
                Name = x.GetName(),
                Type = x.GetServiceType()
            })
            .ToArray();
    }

    public IService? GetActivatedServiceInstance(string id)
    {
        return _services.GetValueOrDefault(id);
    }

    private static Dictionary<string, IService> GetAllExportedServices()
    {
        var bundleAddon = typeof(ServiceLibrary.Addons.Bundle.BaseAddon)
            .Assembly
            .GetExportedTypes();
        var bundleMain = typeof(ServiceLibrary.Main.Bundle.BuiltinService)
            .Assembly
            .GetExportedTypes();

        var bundleAssemblies = new List<IService>();
        bundleAssemblies.AddRange(GetAssembliesFromExportedTypes(bundleAddon));
        bundleAssemblies.AddRange(GetAssembliesFromExportedTypes(bundleMain));

        return bundleAssemblies.ToDictionary(service => service.GetId());
    }

    private static IEnumerable<IService> GetAssembliesFromExportedTypes(Type[] types)
    {
        return types
            .Where(x => !x.IsAbstract && x is { IsInterface: false, IsClass: true } &&
                        typeof(IService).IsAssignableFrom(x))
            .Select(Activator.CreateInstance)
            .Cast<IService>()
            .ToList();
    }
}
