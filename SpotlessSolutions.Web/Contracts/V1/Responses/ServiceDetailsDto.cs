// ReSharper disable UnusedAutoPropertyAccessor.Global
namespace SpotlessSolutions.Web.Contracts.V1.Responses;

public class ServiceDetailsDto
{
    public required ServiceObjectType Type { get; init; }
    public required string Id { get; init; }
    public required string Description { get; init; }
    public required string Name { get; init; }
}
