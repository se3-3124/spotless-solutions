using SpotlessSolutions.Web.Data.Models;

namespace SpotlessSolutions.Web.Services.Bookings;

public interface IBookingManager
{
    /// <summary>
    /// Update booking state
    /// </summary>
    /// <param name="id"></param>
    /// <param name="targetState"></param>
    /// <returns></returns>
    Task<bool> UpdateBookingState(Guid id, BookingStatus targetState);

    /// <summary>
    /// Send email to the user
    /// </summary>
    /// <param name="userId"></param>
    /// <param name="subject"></param>
    /// <param name="body"></param>
    /// <returns></returns>
    Task<bool> SendEmail(Guid userId, string subject, string body);
}
