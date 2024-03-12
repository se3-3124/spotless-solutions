// ReSharper disable UnusedAutoPropertyAccessor.Global
// ReSharper disable UnusedMember.Global
// ReSharper disable ClassNeverInstantiated.Global

using System.Text.Json.Serialization;

namespace SpotlessSolutions.ServiceLibrary.Main.Bundle.InternalTypes;

internal class RoutineCleaningParameters
{
    [JsonPropertyName("last_schedule")]
    public DateTime LastSchedule { get; init; }
    
    [JsonPropertyName("type")]
    public RoutineCleaningTypes Type { get; init; }

    [JsonPropertyName("service_type")]
    public RoutineServiceTypes ServiceType { get; init; }

    [JsonPropertyName("area")]
    public float Area { get; init; }
}
