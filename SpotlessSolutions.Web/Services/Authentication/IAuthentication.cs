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
    Task<SessionToken?> Login(string email, string password);

    /// <summary>
    /// Register
    /// </summary>
    /// <param name="data"></param>
    /// <returns></returns>
    Task<bool> Register(UserRegistrationData data);

    /// <summary>
    /// Request for password reset
    /// </summary>
    /// <param name="email"></param>
    /// <returns></returns>
    Task<bool> RequestForPasswordReset(string email);
}
