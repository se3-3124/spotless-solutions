namespace SpotlessSolutions.Web.Services.Authentication.OAuth2;

public class ExternalUserAccountInformation
{
    public required string Id { get; init; }
    public required string FirstName { get; init; }
    public required string LastName { get; init; }
    public required string Email { get; init; }
}
