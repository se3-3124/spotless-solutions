using System.Text.Json.Serialization;

namespace SpotlessSolutions.ServiceLibrary.Addons.Bundle.InternalTypes;

internal class GarageCleaningParameters
{
    [JsonPropertyName("area")]
    public float Area { get; init; }
}
