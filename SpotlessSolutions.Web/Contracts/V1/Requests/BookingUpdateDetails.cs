using SpotlessSolutions.Web.Data.Models;

namespace SpotlessSolutions.Web.Contracts.V1.Requests;

public class BookingUpdateDetails
{
    public required Guid Id { get; init; } = Guid.Empty;
    public required BookingStatus State { get; init; } = BookingStatus.Pending;
}
