// ReSharper disable UnusedAutoPropertyAccessor.Global
// ReSharper disable CollectionNeverUpdated.Global

namespace SpotlessSolutions.Web.Contracts.V1.Responses;

public class ServiceFieldItem
{
    public required string Id { get; init; }
    public required string Label { get; init; }
    public required string ConfigId { get; init; }
    public required ServiceFieldItemType Type { get; init; }
    public IEnumerable<string[]> SupportedValues { get; init; } = [];
    public Dictionary<string, string> Restrictions { get; init; } = new();
}

public class ServiceFieldResponse
{
    public bool Success { get; init; }
    public IEnumerable<ServiceFieldItem> Result { get; init; } = [];
}
