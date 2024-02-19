using SpotlessSolutions.Web.Services.Services.Addons;
using SpotlessSolutions.Web.Services.Services.Builtin;

namespace SpotlessSolutions.Web.Services.Services;

public interface IServiceRegistry
{
    /// <summary>
    /// Gets all registered services within the registry
    /// </summary>
    /// <returns></returns>
    ServiceDetails[] GetAllRegisteredServices();
    
    /// <summary>
    /// Gets all addons on the registry
    /// </summary>
    /// <returns></returns>
    ServiceDetails[] GetAllAddons();
    
    /// <summary>
    /// Gets all standalone services
    /// </summary>
    /// <returns></returns>
    string[] GetAllStandaloneAddonsServices();
    
    /// <summary>
    /// Get a activated instance of the service
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    IService? GetActivatedServiceInstance(string id);
    
    /// <summary>
    /// Get a activated addon instance
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    IAddon? GetActivatedAddonInstance(string id);
}
