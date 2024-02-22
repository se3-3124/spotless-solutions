namespace SpotlessSolutions.Web.Contracts.V1.Responses;

public class SessionResult
{
    public string Token { get; init; } = string.Empty;
    public string RefreshToken { get; init; } = string.Empty;
}

