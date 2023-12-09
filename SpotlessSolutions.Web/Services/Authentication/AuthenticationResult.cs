namespace SpotlessSolutions.Web.Services.Authentication;

public class AuthenticationResult
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public bool IsAdmin { get; set; }
    public string Token { get; set; }
    public string RefreshToken { get; set; }
}