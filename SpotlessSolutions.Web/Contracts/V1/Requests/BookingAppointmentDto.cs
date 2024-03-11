namespace SpotlessSolutions.Web.Contracts.V1.Requests;

public class BookingAppointmentDto
{
    public required DateTime Schedule { get; init; }
    public required Guid AddressId { get; init; }
    public required string MainServiceId { get; init; }
    public required string MainServiceConfig { get; init; }
    public required Dictionary<string, string> Addons { get; init; }
}
