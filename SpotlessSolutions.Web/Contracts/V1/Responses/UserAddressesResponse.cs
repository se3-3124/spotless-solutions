namespace SpotlessSolutions.Web.Contracts.V1.Responses;

public class UserAddressesResponse
{
    public bool Success { get; init; }
    public IEnumerable<UserAddressResponseDto> Result { get; init; } = Array.Empty<UserAddressResponseDto>();
}
