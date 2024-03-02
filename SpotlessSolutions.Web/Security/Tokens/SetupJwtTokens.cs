using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

namespace SpotlessSolutions.Web.Security.Tokens;

public static class SetupJwtTokens
{
    private static byte[] HashKey(string key)
    {
        return SHA256.HashData(Encoding.UTF8.GetBytes(key));
    }

    public static void InstallJwtConfig(this IServiceCollection services, IConfiguration configuration)
    {
        var jwtSettings = new JwtConfig();
        configuration.Bind("JwtSettings", jwtSettings);

        services.AddSingleton(jwtSettings);

        var hostname = Environment.GetEnvironmentVariable("SITE_HOSTNAME");
        var tokenValidationParameter = new TokenValidationParameters
        {
            ClockSkew = TimeSpan.FromMinutes(5),
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(HashKey(jwtSettings.Secret)),
            RequireSignedTokens = true,
            RequireExpirationTime = true,
            ValidateLifetime = true,
            ValidateAudience = true,
            ValidAudience = $"{hostname}",
            ValidateIssuer = true,
            ValidIssuer = $"{hostname}"
        };

        services.AddSingleton(tokenValidationParameter);

        services
            .AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = tokenValidationParameter;
            });

        services.AddAuthorization();
    }
}