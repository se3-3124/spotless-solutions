namespace SpotlessSolutions.Web.Services.Services;

public interface IServiceManager
{
    /// <summary>
    /// Update current service configuration.
    /// </summary>
    /// <param name="update"></param>
    /// <returns></returns>
    Task<bool> UpdateServiceConfiguration(ServiceConfig update);

    /// <summary>
    /// Update current addon configuration.
    /// </summary>
    /// <param name="update"></param>
    /// <returns></returns>
    Task<bool> UpdateAddonConfiguration(ServiceConfig update);
}
