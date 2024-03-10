using System.Text.Json.Serialization;

namespace SpotlessSolutions.ServiceLibrary.Addons.Bundle.InternalTypes;

internal class SofaDeepCleaningParameters
{
    [JsonPropertyName("seaters")]
    public int Seaters { get; init; }
}
