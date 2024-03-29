﻿// ReSharper disable UnusedAutoPropertyAccessor.Global

namespace SpotlessSolutions.ServiceLibrarySdk.ReturnTypes;

public class ServiceExportObject
{
    public required string Id { get; init; }
    public required string Name { get; init; }
    public string? Description { get; init; }
    public string? Config { get; init; }
    public required ServiceType Type { get; init; }
    public required bool Editable { get; init; }
}