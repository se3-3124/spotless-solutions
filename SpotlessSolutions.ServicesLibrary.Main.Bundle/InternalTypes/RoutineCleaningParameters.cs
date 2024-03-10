using System.Text.Json.Serialization;

namespace SpotlessSolutions.ServiceLibrary.Main.Bundle.InternalTypes;

internal class RoutineCleaningParameters
{
    [JsonPropertyName("type")]
    public RoutineCleaningTypes Type { get; init; }

    [JsonPropertyName("service_type")]
    public RoutineServiceTypes ServiceType { get; init; }

    [JsonPropertyName("area")]
    public float Area { get; init; }
}
