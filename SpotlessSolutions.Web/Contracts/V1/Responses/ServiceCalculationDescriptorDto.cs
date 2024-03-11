namespace SpotlessSolutions.Web.Contracts.V1.Responses;

public class ServiceCalculationDescriptorDto
{
    public required float CalculatedValue { get; init; }
    public required List<string[]> Descriptors { get; init; }
}
