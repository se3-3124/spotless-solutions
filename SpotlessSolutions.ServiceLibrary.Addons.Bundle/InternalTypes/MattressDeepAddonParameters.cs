using System.Text.Json.Serialization;

namespace SpotlessSolutions.ServiceLibrary.Addons.Bundle.InternalTypes;

internal class MattressDeepAddonParameters
{
    [JsonPropertyName("size")]
    public MattressDeepSize Size { get; init; }

    [JsonPropertyName("count")]
    public int Count { get; init; }
}
