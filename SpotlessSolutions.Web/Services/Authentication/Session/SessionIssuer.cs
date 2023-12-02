using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.IdentityModel.Tokens;
using SpotlessSolutions.Web.Extensions;
using SpotlessSolutions.Web.Security.Tokens;

namespace SpotlessSolutions.Web.Services.Authentication.Session;

public class SessionIssuer : ISessionIssuer
{
    private readonly IDistributedCache _cache;
    private readonly JwtConfig _jwtConfig;
    private readonly TokenValidationParameters _tokenValidationParameters;
    private readonly UserManager<IdentityUser> _userManager;

    public SessionIssuer(IDistributedCache cache,
        JwtConfig config,
        TokenValidationParameters parameters,
        UserManager<IdentityUser> userManager)
    {
        _cache = cache;
        _jwtConfig = config;
        _tokenValidationParameters = parameters;
        _userManager = userManager;
    }

    public async Task<SessionToken?> Sign(IdentityUser user)
    {
        var tokenHandler = new JwtSecurityTokenHandler();

        var sha = SHA256.Create();
        var key = sha.ComputeHash(Encoding.UTF8.GetBytes(_jwtConfig.Secret));

        var hostname = Environment.GetEnvironmentVariable("SITE_HOSTNAME");
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Email!),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email!),
                new Claim(JwtRegisteredClaimNames.Aud, "session://dontyouhackmeplease"),
                new Claim(JwtRegisteredClaimNames.Iat, $"{hostname}/api/auth/login"),
                new Claim("id", user.Id)
            }),
            Expires = DateTime.Now.Add(TimeSpan.Parse(_jwtConfig.TokenLifetime)),
            SigningCredentials =
                new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256)
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);

        var refreshTokenId = Convert.ToBase64String(RandomNumberGenerator.GetBytes(128));
        var refreshTokenInfo = new RefreshTokenInformation
        {
            TokenId = token.Id,
            UserId = user.Id,
            Created = DateTime.Now,
            Expires = DateTime.Now.AddDays(7)
        };

        await _cache.SetRecordAsync($"t_{refreshTokenId}", refreshTokenInfo,
            unusedExpireTme: TimeSpan.FromDays(7));

        return new SessionToken
        {
            Token = tokenHandler.WriteToken(token),
            RefreshToken = refreshTokenId
        };
    }

    private bool IsJwtValidSecurityAlgorithm(SecurityToken validatedToken)
    {
        return (validatedToken is JwtSecurityToken jwtSecurityToken) &&
               jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256,
                   StringComparison.InvariantCultureIgnoreCase);
    }

    private ClaimsPrincipal? GetPrincipalFromToken(string token)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        try
        {
            var principal = tokenHandler.ValidateToken(token, _tokenValidationParameters, out var validatedToken);
            return !IsJwtValidSecurityAlgorithm(validatedToken) ? null : principal;
        }
        catch
        {
            return null;
        }
    }

    public async Task<SessionToken?> Refresh(string oldToken, string refreshToken)
    {
        var principal = GetPrincipalFromToken(oldToken);
        if (principal == null)
        {
            return null;
        }
        
        // Check if the actual refresh token
        var refreshData = await _cache.GetRecordAsync<RefreshTokenInformation>($"t_{refreshToken}");
        if (refreshData == null)
        {
            return null;
        }

        if (refreshData.Expires <= DateTime.Now)
        {
            return null;
        }

        var id = principal.Claims.Single(x => x.Type == "id").Value;
        var user = await _userManager.FindByIdAsync(id);

        if (user != null)
        {
            return await Sign(user);
        }

        return null;
    }

    public bool IsTokenValid(string token)
    {
        return GetPrincipalFromToken(token) != null;
    }
}
