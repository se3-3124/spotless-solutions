using SpotlessSolutions.Web.Data.Models;

namespace SpotlessSolutions.Web.Services.Bookings;

public interface IBookingManager
{
    /// <summary>
    /// Gets the booking per month
    /// </summary>
    /// <param name="year"></param>
    /// <param name="month"></param>
    Task<IEnumerable<BookingObject>> GetBooking(int year, int month);
    
    /// <summary>
    /// Gets the booking on DateTime range
    /// </summary>
    /// <param name="start"></param>
    /// <param name="end"></param>
    Task<IEnumerable<BookingObject>> GetBooking(DateTime start, DateTime end);

    /// <summary>
    /// Gets anonymized bookings
    /// </summary>
    /// <param name="year"></param>
    /// <param name="month"></param>
    /// <returns></returns>
    Task<IEnumerable<DateTime>> GetAnonymizedBookingDetails(int year, int month);

    /// <summary>
    /// Get anonymized bookings from date range
    /// </summary>
    /// <param name="start"></param>
    /// <param name="end"></param>
    /// <returns></returns>
    Task<IEnumerable<DateTime>> GetAnonymizedBookingDetails(DateTime start, DateTime end);

    /// <summary>
    /// Update booking state
    /// </summary>
    /// <param name="id"></param>
    /// <param name="targetState"></param>
    /// <returns></returns>
    Task<bool> UpdateBookingState(Guid id, BookingStatus targetState);
}
