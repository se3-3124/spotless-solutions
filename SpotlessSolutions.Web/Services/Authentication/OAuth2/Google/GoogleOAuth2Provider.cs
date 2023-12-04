using System.Web;
using RestSharp;

namespace SpotlessSolutions.Web.Services.Authentication.OAuth2.Google;

public class GoogleOAuth2Provider : IOAuth2Provider
{
    private readonly GoogleClientConfig _config;
    private readonly ILogger<GoogleOAuth2Provider> _logger;

    public GoogleOAuth2Provider(GoogleClientConfig config, ILogger<GoogleOAuth2Provider> logger)
    {
        _config = config;
        _logger = logger;
    }
    
    public string? GetAuthorizationUrl(string? state)
    {
        if (string.IsNullOrEmpty(_config.ClientId) || string.IsNullOrEmpty(_config.ClientSecret))
        {
            _logger.LogError(
                "Google client config is not configured. cId: {clientId}, cS: {clientSecret}", 
                _config.ClientId,
                _config.ClientSecret);
            return null;
        }

        var builder = new UriBuilder("https://accounts.google.com/o/oauth2/v2/auth");
        var qs = HttpUtility.ParseQueryString(builder.Query);
        
        qs.Add("client_id", _config.ClientId);
        qs.Add("redirect_uri", _config.RedirectUri);
        qs.Add("response_type", "code");
        qs.Add("scope", "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile");
        qs.Add("access_type", "offline");

        if (!string.IsNullOrEmpty(state))
        {
            qs.Add("state", state);
        }

        builder.Query = qs.ToString();
        return builder.ToString();
    }

    private async Task<T?> GetFromApi<T>(string path, string token)
    {
        var options = new RestClientOptions("https://www.googleapis.com");
        
        var client = new RestClient(options);
        var request = new RestRequest(path);
        request.AddHeader("Authorization", $"Bearer {token}");

        try
        {
            var data = await client.GetAsync<T>(request);
            return data ?? default(T);
        }
        catch (Exception e)
        {
            _logger.LogError("Failed to get user information. stack: {stack}", e);
            return default(T);
        }
    }

    public async Task<ExternalUserAccountInformation?> GetUserInformation(string token)
    {
        if (string.IsNullOrEmpty(_config.ClientId) || string.IsNullOrEmpty(_config.ClientSecret))
        {
            _logger.LogError(
                "Google client config is not configured. cId: {clientId}, cS: {clientSecret}", 
                _config.ClientId,
                _config.ClientSecret);
            return null;
        }
        
        var options = new RestClientOptions("https://oauth2.googleapis.com");
        var client = new RestClient(options);

        var path = $"/token?client_id={_config.ClientId}" +
                 $"&client_secret={_config.ClientSecret}" +
                 $"&code={token}" +
                 $"&grant_type=authorization_code" +
                 $"&redirect_uri={_config.RedirectUri}";

        var request = new RestRequest(path);

        try
        {
            // Get authorization
            var data = await client.PostAsync<GoogleAccessTokenResponse>(request);
            if (data == null)
            {
                return null;
            }

            var userInfoData = await GetFromApi<GoogleUserInfoResponse>("/oauth2/v1/userinfo", data.AccessToken);
            if (userInfoData == null)
            {
                return null;
            }

            return new ExternalUserAccountInformation
            {
                FirstName = userInfoData.GivenName,
                LastName = userInfoData.FamilyName,
                Email = userInfoData.Email,
                Id = userInfoData.Id
            };
        }
        catch (Exception e)
        {
            _logger.LogError("Failed to fetch oauth2 data. e: {stack}", e);
            return null;
        }
    }
}
