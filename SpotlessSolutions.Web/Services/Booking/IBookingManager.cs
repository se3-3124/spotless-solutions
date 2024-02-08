namespace SpotlessSolutions.Web.Services.Booking;

public interface IBookingManager
{
    /// <summary>
    /// Gets the booking per month
    /// </summary>
    /// <param name="year"></param>
    /// <param name="month"></param>
    Task<List<BookingObject>> GetAllBookings(int year, int month);

    /// <summary>
    /// Gets the booking on DateTime range
    /// </summary>
    /// <param name="start"></param>
    /// <param name="end"></param>
    Task<List<BookingObject>> GetAllBookings(DateTime start, DateTime end);
}
