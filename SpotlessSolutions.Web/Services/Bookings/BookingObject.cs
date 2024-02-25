using SpotlessSolutions.Web.Data.Models;
using SpotlessSolutions.Web.Services.Services;

namespace SpotlessSolutions.Web.Services.Bookings;

public class ServiceDetailConfig
{
    public required ServiceDetails Service { get; init; }
    public required string Configuration { get; init; }
}

public class User
{
    public required string Email { get; init; }
    public required Guid UserId { get; init; }
    public required string FirstName { get; init; }
    public required string LastName { get; init; }
}

public class Address
{
    public required string Street { get; set; }
    public required string District { get; set; }
    public required string Barangay { get; set; }
    public required string PostalCode { get; set; }
    public required string City { get; set; }
    public required string Province { get; set; }
}

public record BookingObject(
    Guid Id,
    DateTime Schedule,
    ServiceDetailConfig MainService,
    List<ServiceDetailConfig> AddOns,
    BookingStatus Status,
    User User,
    Address Address,
    float TotalPrice);