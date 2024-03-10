using System.Text.Json.Serialization;

namespace SpotlessSolutions.ServiceLibrary.Main.Bundle.InternalTypes;

internal class PostConstructionCleaningParameters
{
    [JsonPropertyName("area")]
    public float Area { get; init; }
}
