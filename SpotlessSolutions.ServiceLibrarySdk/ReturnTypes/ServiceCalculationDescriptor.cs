namespace SpotlessSolutions.ServiceLibrarySdk.ReturnTypes;

public class ServiceCalculationDescriptor
{
    public required string Id { get; init; }
    public required string Name { get; init; }
    public required float CalculatedValue { get; init; }
    public required List<string[]> Descriptors { get; init; }
    public required List<string[]> SensitiveDescriptors { get; init; }
    public required bool RequiresAssessment { get; init; }
}
