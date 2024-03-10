namespace SpotlessSolutions.Web.Contracts.V1.Responses;

public class ServiceListResponse
{
    public bool Success { get; init; }
    public IEnumerable<ServiceDetailsDto> Data { get; init; } = Array.Empty<ServiceDetailsDto>();
}
