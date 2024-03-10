// ReSharper disable UnusedAutoPropertyAccessor.Global
// ReSharper disable UnusedMember.Global
// ReSharper disable ClassNeverInstantiated.Global

using System.Text.Json.Serialization;

namespace SpotlessSolutions.ServiceLibrary.Addons.Bundle.InternalTypes;

internal class LawnTrimmingParameters
{
    [JsonPropertyName("internal_photo_address")]
    public required string InternalPhotoAddress { get; init; }

    [JsonPropertyName("job_comment")]
    public required string JobComment { get; init; }
}
