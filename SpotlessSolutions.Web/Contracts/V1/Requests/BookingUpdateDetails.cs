using SpotlessSolutions.Web.Data.Models;

namespace SpotlessSolutions.Web.Contracts.V1.Requests;

public class BookingUpdateDetails
{
    public required Guid Id { get; set; } = Guid.Empty;
    public required BookingStatus State { get; set; } = BookingStatus.Pending;
}
