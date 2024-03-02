namespace SpotlessSolutions.Web.Contracts.V1.Requests;

public class SessionData
{
    public string Token { get; init; } = string.Empty;
    public string RefreshToken { get; init; } = string.Empty;
}
