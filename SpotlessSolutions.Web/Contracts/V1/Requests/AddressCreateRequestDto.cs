// ReSharper disable UnusedAutoPropertyAccessor.Global

namespace SpotlessSolutions.Web.Contracts.V1.Requests;

public class AddressCreateRequestDto
{
    public required string Street { get; init; }
    public required string District { get; init; }
    public required string Barangay { get; init; }
    public required string PostalCode { get; init; }
    public required string City { get; init; }
    public required string Province { get; init; }
}