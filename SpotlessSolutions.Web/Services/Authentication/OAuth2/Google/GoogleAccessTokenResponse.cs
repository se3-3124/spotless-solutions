// ReSharper disable AutoPropertyCanBeMadeGetOnly.Global

using System.Text.Json.Serialization;

namespace SpotlessSolutions.Web.Services.Authentication.OAuth2.Google;

public class GoogleAccessTokenResponse
{
    [JsonPropertyName("access_token")]
    public string AccessToken { get; set; } = string.Empty;
    
    [JsonPropertyName("expires_in")]
    public int ExpiresIn { get; set; }
    
    [JsonPropertyName("token_type")]
    public string TokenType { get; set; } = string.Empty;
    
    [JsonPropertyName("scope")]
    public string Scope { get; set; } = string.Empty;
    
    [JsonPropertyName("refresh_token")]
    public string RefreshToken { get; set; } = string.Empty;
}
