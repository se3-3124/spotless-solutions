namespace SpotlessSolutions.Web.Contracts.V1.Responses;

public class ServiceData
{
    public required string Id { get; init; }
    public required string Name { get; init; }
    public string? Description { get; init; }
    public string? Config { get; init; }
    public required ServiceObjectType Type { get; init; }
    public required bool Editable { get; init; }
}

public class ServiceDataResponse
{
    public bool Success { get; init; }
    public required ServiceData Result { get; init; }
}