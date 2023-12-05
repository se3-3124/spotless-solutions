using Microsoft.AspNetCore.Mvc;
using SpotlessSolutions.Web.Contracts.V1.Responses;
using SpotlessSolutions.Web.Data.Models;
using SpotlessSolutions.Web.Services.Authentication;
using SpotlessSolutions.Web.Services.Authentication.OAuth2;

namespace SpotlessSolutions.Web.Controllers.V1;

[Route("/oauth2/google")]
public class GoogleOAuth2Controller : ControllerBase
{
    private readonly IOAuth2Provider _serviceProvider;
    private readonly IAuthentication _authentication;

    public GoogleOAuth2Controller([FromKeyedServices("GoogleOAuth2Provider")] IOAuth2Provider serviceProvider,
        IAuthentication authentication)
    {
        _serviceProvider = serviceProvider;
        _authentication = authentication;
    }

    [HttpGet("request")]
    [ProducesResponseType(typeof(ErrorException), 500)]
    public IActionResult OAuth2Request([FromQuery] string state)
    {
        var path = _serviceProvider.GetAuthorizationUrl(state);
        var hostname = Environment.GetEnvironmentVariable("SITE_HOSTNAME")!;

        return Redirect(path ?? $"{hostname}/auth/oauth/failure");
    }

    [HttpGet("oauth2callback")]
    public async Task<IActionResult> OAuth2Callback([FromQuery] string code, [FromQuery] string state)
    {
        var hostname = Environment.GetEnvironmentVariable("SITE_HOSTNAME")!;

        if (string.IsNullOrEmpty(code))
        {
            return Redirect($"{hostname}/auth/oauth/failure");
        }
        
        var information = await _serviceProvider.GetUserInformation(code);
        if (information == null)
        {
            return Redirect($"{hostname}/auth/oauth/failure");
        }

        if (state == "registration_state")
        {
            var registerResult = await _authentication.RegisterOAuth2User(AccountBindingType.Google, information);
            return Redirect(!registerResult
                ? $"{hostname}/auth/oauth/failure"
                : $"{hostname}/auth/oauth/success?state=registration_state"
            );
        }

        var loginData = await _authentication
            .LoginOAuth2User(AccountBindingType.Google, information.Id);

        return Redirect(loginData == null
            ? $"{hostname}/auth/oauth/failure"
            : $"{hostname}/auth/oauth/catch?t={loginData.Token}&r={loginData.RefreshToken}");
    }
}
