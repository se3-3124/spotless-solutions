using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.IdentityModel.Tokens;
using SpotlessSolutions.Web.Data;
using SpotlessSolutions.Web.Data.Models;
using SpotlessSolutions.Web.Extensions;
using SpotlessSolutions.Web.Security.Tokens;

namespace SpotlessSolutions.Web.Services.Authentication.Session;

public class SessionIssuer : ISessionIssuer
{
    private readonly IDistributedCache _cache;
    private readonly JwtConfig _jwtConfig;
    private readonly TokenValidationParameters _tokenValidationParameters;
    private readonly UserManager<IdentityUser> _userManager;
    private readonly DataContext _context;

    public SessionIssuer(IDistributedCache cache,
        JwtConfig config,
        TokenValidationParameters parameters,
        UserManager<IdentityUser> userManager,
        DataContext context)
    {
        _cache = cache;
        _jwtConfig = config;
        _tokenValidationParameters = parameters;
        _context = context;
        _userManager = userManager;
    }

    public async Task<SessionToken?> Sign(IdentityUser user, UserData data)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = SHA256.HashData(Encoding.UTF8.GetBytes(_jwtConfig.Secret));

        var hostname = Environment.GetEnvironmentVariable("SITE_HOSTNAME");
        var securityKey = new SymmetricSecurityKey(key);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Email!),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email!),
                new Claim(JwtRegisteredClaimNames.Aud, $"{hostname}"),
                new Claim(JwtRegisteredClaimNames.Iss, $"{hostname}"),
                new Claim("user_role", data.Role.ToString()),
                new Claim("first_name", data.FirstName),
                new Claim("last_name", data.LastName),
                new Claim("id", user.Id),
                new Claim("cid", data.Id.ToString())
            }),
            Expires = DateTime.Now.Add(TimeSpan.Parse(_jwtConfig.TokenLifetime)),
            SigningCredentials =
                new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256)
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);

        var refreshTokenId = WebEncoders.Base64UrlEncode(RandomNumberGenerator.GetBytes(128));
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

        try
        {
            var id = principal.Claims.Single(x => x.Type == "id").Value;
            var dataId = principal.Claims.Single(x => x.Type == "cid").Value;

            var user = await _userManager.FindByIdAsync(id);

            var isValidDataIdGuid = Guid.TryParse(dataId, out var userDataId);
            if (user == null || !isValidDataIdGuid)
            {
                return null;
            }

            var userData = await _context.UserData.FindAsync(userDataId);
            if (userData == null)
            {
                return null;
            }

            return await Sign(user, userData);
        }
        catch
        {
            return null;
        }
    }

    public bool IsTokenValid(string token)
    {
        return GetPrincipalFromToken(token) != null;
    }
}
