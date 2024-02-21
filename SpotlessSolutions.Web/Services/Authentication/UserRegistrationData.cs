namespace SpotlessSolutions.Web.Services.Authentication;

public class UserRegistrationData
{
    public string FirstName { get; init; } = string.Empty;
    public string LastName { get; init; } = string.Empty;
    public string PhoneNumber { get; init; } = string.Empty;
    public string Email { get; init; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}
