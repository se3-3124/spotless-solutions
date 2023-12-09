namespace SpotlessSolutions.Web.Contracts.V1.Responses;

public class SessionResult
{
    public string Token { get; set; }
    public string RefreshToken { get; set; }
    public bool IsAdmin { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
}
