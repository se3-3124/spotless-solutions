using Microsoft.AspNetCore.Identity;
using SpotlessSolutions.Web.Data.Models;

namespace SpotlessSolutions.Web.Security.Tokens.Session;

public interface ISessionIssuer
{
    /// <summary>
    /// Sign a token
    /// </summary>
    /// <param name="user"></param>
    /// <param name="data"></param>
    /// <returns></returns>
    Task<SessionToken?> Sign(IdentityUser user, UserData data);

    /// <summary>
    /// Refresh the token to a new one
    /// </summary>
    /// <param name="oldToken"></param>
    /// <param name="refreshToken"></param>
    /// <returns></returns>
    Task<SessionToken?> Refresh(string oldToken, string refreshToken);

    /// <summary>
    /// Validate if token still be used
    /// </summary>
    /// <param name="token"></param>
    /// <returns></returns>
    bool IsTokenValid(string token);
}
