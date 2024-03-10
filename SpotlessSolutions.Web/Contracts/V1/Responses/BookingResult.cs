// ReSharper disable UnusedAutoPropertyAccessor.Global

using SpotlessSolutions.Web.Data.Models;

namespace SpotlessSolutions.Web.Contracts.V1.Responses;

public class BookingDetailsDto
{
    public class BookingUser
    {
        public string FirstName { get; init; } = string.Empty;
        public string LastName { get; init; } = string.Empty;
        public Guid Id { get; init; }
    }
    
    public class ServiceDetailConfig
    {
        public required ServiceDetailsDto Service { get; init; }
        public required IEnumerable<string[]> BookingDescriptor { get; init; }
        public required float Calculated { get; init; }
    }

    public class BookingAddress
    {
        public string Street { get; init; } = string.Empty;
        public string District { get; init; } = string.Empty;
        public string Barangay { get; init; } = string.Empty;
        public string PostalCode { get; init; } = string.Empty;
        public string City { get; init; } = string.Empty;
        public string Province { get; init; } = string.Empty;
    }
    
    public Guid Id { get; init; }
    public required ServiceDetailConfig MainService { get; init; }
    public required IEnumerable<ServiceDetailConfig> Addons { get; init; }
    public required BookingUser User { get; init; }
    public required BookingAddress Address { get; init; }
    public float TotalPrice { get; init; }
    public required DateTime Schedule { get; init; }
    public required BookingStatus Status { get; init; }
}

public class BookingResult
{
    public bool Success { get; init; }
    public required IEnumerable<BookingDetailsDto> Data { get; init; }
}
