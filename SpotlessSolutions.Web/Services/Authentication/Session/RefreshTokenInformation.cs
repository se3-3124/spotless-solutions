namespace SpotlessSolutions.Web.Services.Authentication.Session;

public class RefreshTokenInformation
{
    public DateTime Created { get; init; }
    public DateTime Expires { get; init; }
    public string UserId { get; init; } = string.Empty;
    public string TokenId { get; init; } = string.Empty;
}