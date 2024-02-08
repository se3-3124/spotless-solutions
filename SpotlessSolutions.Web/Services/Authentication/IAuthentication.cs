using SpotlessSolutions.Web.Data.Models;
using SpotlessSolutions.Web.Services.Authentication.OAuth2;
using SpotlessSolutions.Web.Services.Authentication.Session;

namespace SpotlessSolutions.Web.Services.Authentication;

public interface IAuthentication
{
    /// <summary>
    /// Login
    /// </summary>
    /// <param name="email"></param>
    /// <param name="password"></param>
    /// <returns>Authentication token or null</returns>
    Task<AuthenticationResult?> Login(string email, string password);

    /// <summary>
    /// Register
    /// </summary>
    /// <param name="data"></param>
    /// <param name="sendConfirmationEmail"></param>
    /// <returns></returns>
    Task<bool> Register(UserRegistrationData data, bool sendConfirmationEmail = true);

    /// <summary>
    /// Verify email via token
    /// </summary>
    /// <param name="token"></param>
    /// <returns></returns>
    Task<bool> VerifyEmail(string token);

    /// <summary>
    /// Request for password reset
    /// </summary>
    /// <param name="email"></param>
    /// <returns></returns>
    Task<bool> RequestForPasswordReset(string email);

    /// <summary>
    /// Reset user password
    /// </summary>
    /// <param name="token"></param>
    /// <param name="newPassword"></param>
    /// <returns></returns>
    Task<bool> ResetPassword(string token, string newPassword);

    /// <summary>
    /// Register user from OAuth2
    /// </summary>
    /// <param name="source"></param>
    /// <param name="data"></param>
    /// <returns></returns>
    Task<bool> RegisterOAuth2User(AccountBindingType source, ExternalUserAccountInformation data);

    /// <summary>
    /// Authenticate the user using OAuth2 flow
    /// </summary>
    /// <param name="source"></param>
    /// <param name="id"></param>
    /// <returns></returns>
    Task<SessionToken?> LoginOAuth2User(AccountBindingType source, string id);
}
