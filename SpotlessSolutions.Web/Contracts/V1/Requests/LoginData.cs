using System.Text.Json.Serialization;

namespace SpotlessSolutions.Web.Contracts.V1.Requests;

public class LoginData
{
    public string Email { get; set; }
    public string Password { get; set; }
}
