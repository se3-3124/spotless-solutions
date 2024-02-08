// ReSharper disable AutoPropertyCanBeMadeGetOnly.Global

namespace SpotlessSolutions.Web.Services.Authentication.OAuth2.Google;

public class GoogleClientConfig
{
    public string ClientId { get; set; } = string.Empty;
    public string ClientSecret { get; set; } = string.Empty;
    public string RedirectUri { get; set; } = string.Empty;
}