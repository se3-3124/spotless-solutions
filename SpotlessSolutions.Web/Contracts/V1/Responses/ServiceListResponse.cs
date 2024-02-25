namespace SpotlessSolutions.Web.Contracts.V1.Responses;

public class ServiceListResponse
{
    public bool Success { get; init; }
    public IEnumerable<ServiceDetails> Data { get; init; } = Array.Empty<ServiceDetails>();
}
