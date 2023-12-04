using System.Text.Json.Serialization;

namespace SpotlessSolutions.Web.Services.Authentication.OAuth2.Google;

public class GoogleUserInfoResponse
{
    [JsonPropertyName("picture")]
    public string Picture { get; set; }
    
    [JsonPropertyName("verified_email")]
    public string VerifiedEmail { get; set; }
    
    [JsonPropertyName("id")]
    public string Id { get; set; }
    
    [JsonPropertyName("email")]
    public string Email { get; set; }
    
    [JsonPropertyName("family_name")]
    public string FamilyName { get; set; }
    
    [JsonPropertyName("name")]
    public string Name { get; set; }
    
    [JsonPropertyName("given_name")]
    public string GivenName { get; set; }
}
