using SpotlessSolutions.Web.Contracts.V1.Responses;
using SpotlessSolutions.Web.Services.Services;

namespace SpotlessSolutions.Web.Contracts.V1.ResponseMappers;

public static class ServiceTypeToServiceObjectType
{
    public static ServiceObjectType ToServiceObjectType(this ServiceType type)
    {
        return type switch
        {
            ServiceType.Addons => ServiceObjectType.Addon,
            ServiceType.Main => ServiceObjectType.Main,
            _ => throw new NotSupportedException("Value is not supported!")
        };
    }
}
