// ReSharper disable UnusedAutoPropertyAccessor.Global

namespace SpotlessSolutions.Web.Contracts.V1.Requests;

public class AccountRecoveryDetails
{
    public required string Password { get; set; }
    public required string Token { get; set; }
}
