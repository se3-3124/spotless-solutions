namespace SpotlessSolutions.Web.Contracts.V1.Responses;

public class AnonymizedBookingResult
{
    public bool Success { get; init; }
    public required IEnumerable<DateTime> Schedules { get; init; }
}
