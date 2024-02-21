using SpotlessSolutions.Web.Contracts.V1.Requests;

namespace SpotlessSolutions.Web.Services.Services;

public interface IServiceManager
{
    /// <summary>
    /// Update current service configuration.
    /// </summary>
    /// <param name="update"></param>
    /// <returns></returns>
    Task<bool> UpdateServiceConfiguration(ServiceConfig update);
}
