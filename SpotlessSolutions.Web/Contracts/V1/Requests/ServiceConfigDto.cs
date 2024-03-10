// ReSharper disable UnusedAutoPropertyAccessor.Global

namespace SpotlessSolutions.Web.Contracts.V1.Requests;

public class ServiceConfigDto
{
    public required string TargetingServiceId { get; init; }
    public required string Name { get; init; }
    public required string Description { get; init; }
    public required string Config { get; init; }
}
