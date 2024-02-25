using System.Reflection;

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
        var assemblies = Assembly.GetExecutingAssembly().GetExportedTypes()
            .Where(x => !x.IsAbstract && x is { IsInterface: false, IsClass: true } &&
                        typeof(IService).IsAssignableFrom(x))
            .Select(Activator.CreateInstance)
            .Cast<IService>()
            .ToList();

        return assemblies.ToDictionary(service => service.GetId());
    }
}
