using SpotlessSolutions.Web.Services.Booking;

namespace SpotlessSolutions.Web.Contracts.V1.Responses;

public class BookingListResult
{
    public bool Success { get; init; }
    public required BookingObject[] Result { get; init; }
}
