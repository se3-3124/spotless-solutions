// ReSharper disable UnusedAutoPropertyAccessor.Global
// ReSharper disable UnusedMember.Global
// ReSharper disable ClassNeverInstantiated.Global

using System.Text.Json.Serialization;

namespace SpotlessSolutions.ServiceLibrary.Addons.Bundle.InternalTypes;

internal class RefrigeratorCleaningOrMicrowaveCleaningParameters
{
    [JsonPropertyName("count")]
    public int Count { get; set; }
}
