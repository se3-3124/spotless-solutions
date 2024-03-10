// ReSharper disable UnusedAutoPropertyAccessor.Global

using SpotlessSolutions.ServiceLibrarySdk.ReturnTypes;

namespace SpotlessSolutions.Web.Services.Services;

public class ServiceDetails
{
    public required string Id { get; init; }
    public required string Description { get; init; }
    public required string Name { get; init; }
    public required ServiceType Type { get; init; }
}
