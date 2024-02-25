// ReSharper disable UnusedAutoPropertyAccessor.Global

using SpotlessSolutions.Web.Contracts.V1.Responses;

namespace SpotlessSolutions.Web.Contracts.V1.Requests;

public class ServiceConfig
{
    public required string TargetingServiceId { get; init; }
    public required string Name { get; init; }
    public required string Description { get; init; }
    public required string Config { get; init; }
    public required ServiceObjectType Type { get; init; }
}
