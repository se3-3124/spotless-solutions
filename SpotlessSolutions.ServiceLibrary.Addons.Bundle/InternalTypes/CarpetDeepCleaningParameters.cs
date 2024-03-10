using System.Text.Json.Serialization;

namespace SpotlessSolutions.ServiceLibrary.Addons.Bundle.InternalTypes;

internal class CarpetDeepCleaningParameters
{
    [JsonPropertyName("internal_photo_address")]
    public required string InternalPhotoAddress { get; init; }

    [JsonPropertyName("size")]
    public float Size { get; init; }
}
