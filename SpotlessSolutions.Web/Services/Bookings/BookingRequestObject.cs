namespace SpotlessSolutions.Web.Services.Bookings;

public class BookingRequestObject
{
    public required DateTime Schedule { get; init; }
    public required Guid AddressId { get; init; }
    public required string MainServiceId { get; init; }
    public required string MainServiceConfig { get; init; }
    public required Dictionary<string, string> Addons { get; init; }
}
