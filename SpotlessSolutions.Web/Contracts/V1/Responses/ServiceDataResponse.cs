namespace SpotlessSolutions.Web.Contracts.V1.Responses;

public class ServiceDataResponse
{
    public bool Success { get; init; }
    public required ServiceData Result { get; init; }
}