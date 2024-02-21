namespace SpotlessSolutions.Web.Services.Services;

public class ServiceConfig
{
    public required string TargetingServiceId { get; init; }
    public required string Name { get; init; }
    public required string Description { get; init; }
    public required string Config { get; init; }
}