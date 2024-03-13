// ReSharper disable UnusedMember.Global
// ReSharper disable UnusedMember.Global
// ReSharper disable ClassNeverInstantiated.Global
// ReSharper disable UnusedAutoPropertyAccessor.Global

using System.Text.Json.Serialization;

namespace SpotlessSolutions.ServiceLibrary.Addons.Bundle.InternalTypes;

internal class ExteriorWindowsCleaningParameters
{
    [JsonPropertyName("internal_photo_address")]
    public required string InternalPhotoAddress { get; init; }
}
