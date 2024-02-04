// ReSharper disable AutoPropertyCanBeMadeGetOnly.Global

namespace SpotlessSolutions.Web.Security.Tokens;

public class JwtConfig
{
    public string Secret { get; set; } = string.Empty;
    public string TokenLifetime { get; set; } = string.Empty;
}
