namespace SpotlessSolutions.Web.Services.Accounts;

public class CreateAddressDetails
{
    public required string Street { get; init; }
    public required string District { get; init; }
    public required string Barangay { get; init; }
    public required string PostalCode { get; init; }
    public required string City { get; init; }
    public required string Province { get; init; }
}