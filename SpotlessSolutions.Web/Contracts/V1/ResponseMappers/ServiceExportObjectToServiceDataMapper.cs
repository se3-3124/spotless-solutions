using SpotlessSolutions.Web.Contracts.V1.Responses;
using SpotlessSolutions.Web.Services.Services;

namespace SpotlessSolutions.Web.Contracts.V1.ResponseMappers;

public static class ServiceExportObjectToServiceDataMapper
{
    public static ServiceData ToServiceData(this ServiceExportObject data)
    {
        return new ServiceData
        {
            Id = data.Id,
            Name = data.Name,
            Description = data.Description,
            Type = data.Type.ToServiceObjectType(),
            Config = data.Config,
            Editable = data.Editable
        };
    }
}
