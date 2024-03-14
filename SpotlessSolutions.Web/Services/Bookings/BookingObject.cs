// ReSharper disable UnusedAutoPropertyAccessor.Global

using SpotlessSolutions.Web.Data.Models;
using SpotlessSolutions.Web.Services.Services;

namespace SpotlessSolutions.Web.Services.Bookings;

public class ServiceDetailConfig
{
    public required ServiceDetails Service { get; init; }
    public required IEnumerable<string[]> BookingDescriptor { get; init; }
    public bool RequiresAssessment { get; init; }
    public required float Calculated { get; init; }
}

public class User
{
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

public class BookingObject
{
    public required Guid Id { get; init; }
    public required DateTime Schedule { get; init; }
    public required ServiceDetailConfig MainService { get; init; }
    public required List<ServiceDetailConfig> Addons { get; init; }
    public required BookingStatus Status { get; init; }
    public required User User { get; init; }
    public required Address Address { get; init; }
    public required float TotalPrice { get; init; }
}
