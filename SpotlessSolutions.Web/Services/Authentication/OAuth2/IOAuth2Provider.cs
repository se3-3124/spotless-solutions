namespace SpotlessSolutions.Web.Services.Authentication.OAuth2;

public interface IOAuth2Provider
{
    string? GetAuthorizationUrl(string? state);

    Task<ExternalUserAccountInformation?> GetUserInformation(string token);
}
