namespace SpotlessSolutions.Web.Services.Services;

public interface IServiceRegistry
{
    /// <summary>
    /// Gets all registered services within the registry
    /// </summary>
    /// <returns></returns>
    IEnumerable<ServiceDetails> GetAllServices();

    /// <summary>
    /// Get a activated instance of the service
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    IService? GetActivatedServiceInstance(string id);
}
