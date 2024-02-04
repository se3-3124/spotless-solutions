// ReSharper disable UnusedAutoPropertyAccessor.Global

namespace SpotlessSolutions.Web.Contracts.V1.Requests;

public class LoginData
{
    public required string Email { get; set; }
    public required string Password { get; set; }
}
