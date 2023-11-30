namespace SpotlessSolutions.Web.Security.Tokens;

public class JwtConfig
{
    public string Secret { get; set; }
    public string TokenLifetime { get; set; }
}