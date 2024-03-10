// ReSharper disable UnusedAutoPropertyAccessor.Global
// ReSharper disable UnusedMember.Global
// ReSharper disable ClassNeverInstantiated.Global

using System.Text.Json.Serialization;

namespace SpotlessSolutions.ServiceLibrary.Main.Bundle.InternalTypes;

internal class PostConstructionCleaningParameters
{
    [JsonPropertyName("area")]
    public float Area { get; init; }
}
