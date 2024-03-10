using System.Text.Json.Serialization;

namespace SpotlessSolutions.ServiceLibrary.Main.Bundle.InternalTypes;

internal class GeneralCleaningParameters
{
    [JsonPropertyName("hours")]
    public int Hours { get; init; }

    [JsonPropertyName("cleaners")]
    public float Cleaners { get; init; }
}
