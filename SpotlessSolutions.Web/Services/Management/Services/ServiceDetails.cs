namespace SpotlessSolutions.Web.Services.Management.Services;

public class ServiceDetails
{
    public required IEnumerable<BaseRule> Rules { get; init; }
    public required string Name { get; init; }
    public required string Description { get; init; }
}
