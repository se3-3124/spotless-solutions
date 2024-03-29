﻿// ReSharper disable UnusedAutoPropertyAccessor.Global

namespace SpotlessSolutions.ServiceLibrarySdk.ReturnTypes;

public class ServiceFieldObject
{
    public required string Id { get; init; }
    public required string Label { get; init; }
    public required string ConfigId { get; init; }
    public required ServiceFieldType Type { get; init; }
    public List<string[]> SupportedValues { get; init; } = [];
    public Dictionary<string, string> Restrictions { get; init; } = new();
}
