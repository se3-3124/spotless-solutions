using SpotlessSolutions.Web.Data.Models;

namespace SpotlessSolutions.Web.Services.Booking;

public class BookingHomeConfig
{
    public double HomeSize { get; init; }
    public int BedroomCount { get; init; }
    public int ComfortRoomCount { get; init; }
    public int KitchenCount { get; init; }
    public int LivingRoomCount { get; init; }
    public int StorageCount { get; init; }
    public int FloorCount { get; init; }
}

public class Address
{
    public string? Street { get; init; }
    public string? District { get; init; }
    public string? Barangay { get; init; }
    public string? PostalCode { get; init; }
    public string? City { get; init; }
    public string? Province { get; init; }
}

public class User
{
    public Guid Id { get; set; }
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public required string? Email { get; set; }
}

public class Service
{
    public Guid Id { get; set; }
    public Guid ServiceId { get; set; }
    public required string Name { get; set; }
    public required float TotalCalculation { get; set; }
}

public class AddOns
{
    public Guid Id { get; set; }
    public Guid AddOnId { get; set; }
    public required string Name { get; set; }
    public required float TotalCalculation { get; set; }
}

public class BookingObject
{
    public Guid Id { get; init; }
    public DateTime IssuedDate { get; init; }
    public BookingHomeConfig? Config { get; set; }
    public UserBookingStatus Status { get; init; }
    public required Address Address { get; init; }
    public float TransportFee { get; init; }
    public bool TransportFeeNeedsAssessment { get; init; }
    public required User User { get; init; }
    public List<Service> ServicesBooked { get; set; } = [];
    public List<AddOns> AddOnsBooked { get; set; } = [];
    public float TotalComputed { get; set; }
}
