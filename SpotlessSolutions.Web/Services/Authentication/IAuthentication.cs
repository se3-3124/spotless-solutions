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
    /// Register the user
    /// </summary>
    /// <param name="data"></param>
    /// <returns></returns>
    Task<bool> Register(UserRegistrationData data);

    /// <summary>
    /// Request for password reset
    /// </summary>
    /// <param name="userId"></param>
    /// <returns></returns>
    Task<bool> RequestForPasswordReset(Guid userId);

    /// <summary>
    /// Validate password reset token if its valid
    /// </summary>
    /// <param name="token"></param>
    /// <returns></returns>
    Task<bool> ValidatePasswordResetToken(string token);

    /// <summary>
    /// Reset user password
    /// </summary>
    /// <param name="token"></param>
    /// <param name="newPassword"></param>
    /// <returns></returns>
    Task<bool> ResetPassword(string token, string newPassword);
}
