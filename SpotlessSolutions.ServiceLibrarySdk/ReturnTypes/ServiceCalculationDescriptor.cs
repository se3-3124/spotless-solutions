namespace SpotlessSolutions.ServiceLibrarySdk.ReturnTypes;

public class ServiceCalculationDescriptor
{
    public required float CalculatedValue { get; init; }
    public required List<string[]> Descriptors { get; init; }
}
