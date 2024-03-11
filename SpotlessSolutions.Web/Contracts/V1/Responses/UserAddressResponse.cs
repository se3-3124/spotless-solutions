namespace SpotlessSolutions.Web.Contracts.V1.Responses;

public class UserAddressResponse
{
    public bool Success { get; init; }
    public required UserAddressResponseDto Result { get; init; }
}