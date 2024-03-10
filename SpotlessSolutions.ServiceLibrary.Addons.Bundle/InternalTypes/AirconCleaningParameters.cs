// ReSharper disable UnusedAutoPropertyAccessor.Global
// ReSharper disable UnusedMember.Global
// ReSharper disable ClassNeverInstantiated.Global

using System.Text.Json.Serialization;

namespace SpotlessSolutions.ServiceLibrary.Addons.Bundle.InternalTypes;

internal class AirconCleaningParameters
{
    [JsonPropertyName("type")]
    public AirconTypes Type { get; init; }

    [JsonPropertyName("cleaning_type")]
    public AirconCleaningType CleaningType { get; init; }

    [JsonPropertyName("horsepower")]
    public float HorsePower { get; init; }

    [JsonPropertyName("count")]
    public int Count { get; init; }
}
