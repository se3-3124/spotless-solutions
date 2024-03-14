// ReSharper disable CollectionNeverUpdated.Global
namespace SpotlessSolutions.Web.Contracts.V1.Responses;

public class ServiceCalculationDescriptorDto
{
    public required string Id { get; init; }
    public required string Name { get; init; }
    public required float CalculatedValue { get; init; }
    public required List<string[]> Descriptors { get; init; }
    public required bool RequiresAssessment { get; init; }
}
