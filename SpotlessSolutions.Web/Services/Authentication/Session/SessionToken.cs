namespace SpotlessSolutions.Web.Services.Authentication.Session;

public class SessionToken
{
    public string Token { get; init; } = string.Empty;
    public string RefreshToken { get; init; } = string.Empty;
}
