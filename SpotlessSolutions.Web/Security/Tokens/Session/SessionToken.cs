namespace SpotlessSolutions.Web.Security.Tokens.Session;

public class SessionToken
{
    public string Token { get; init; } = string.Empty;
    public string RefreshToken { get; init; } = string.Empty;
}
