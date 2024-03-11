namespace SpotlessSolutions.Web.Contracts.V1.Responses;

public class ServiceCalculationResult
{
    public bool Success { get; init; }

    public IEnumerable<ServiceCalculationDescriptorDto> Items { get; init; } =
        Array.Empty<ServiceCalculationDescriptorDto>();

    public float TotalPrice { get; init; }
}
