// ReSharper disable UnusedAutoPropertyAccessor.Global
// ReSharper disable UnusedMember.Global
// ReSharper disable ClassNeverInstantiated.Global

using System.Text.Json.Serialization;

namespace SpotlessSolutions.ServiceLibrary.Addons.Bundle.InternalTypes;

internal class GarageCleaningParameters
{
    [JsonPropertyName("area")]
    public float Area { get; init; }
}
