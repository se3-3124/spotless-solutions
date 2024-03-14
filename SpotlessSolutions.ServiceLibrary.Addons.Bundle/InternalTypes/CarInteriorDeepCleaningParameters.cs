// ReSharper disable UnusedAutoPropertyAccessor.Global
// ReSharper disable UnusedMember.Global
// ReSharper disable ClassNeverInstantiated.Global

using System.Text.Json.Serialization;

namespace SpotlessSolutions.ServiceLibrary.Addons.Bundle.InternalTypes;

internal class CarInteriorDeepCleaningParameters
{
    [JsonPropertyName("car_type")]
    public CarTypes Type { get; init; }

    [JsonPropertyName("service_type")]
    public CarServiceType ServiceType { get; init; }

    [JsonPropertyName("count")]
    public int Count { get; init; }
}
