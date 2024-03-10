using System.Text.Json.Serialization;

namespace SpotlessSolutions.ServiceLibrary.Addons.Bundle.InternalTypes;

internal class CabinetCleaningAndOrganizationParameters
{
    [JsonPropertyName("count")]
    public int Count { get; init; }
}
