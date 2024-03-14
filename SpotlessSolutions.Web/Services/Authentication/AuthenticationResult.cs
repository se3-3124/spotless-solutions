// ReSharper disable UnusedAutoPropertyAccessor.Global

namespace SpotlessSolutions.Web.Services.Authentication;

public class AuthenticationResult
{
    public required string Token { get; init; }
    public required string RefreshToken { get; init; }
}
