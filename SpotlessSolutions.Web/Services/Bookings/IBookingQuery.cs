﻿namespace SpotlessSolutions.Web.Services.Bookings;

public interface IBookingQuery
{
    /// <summary>
    /// Gets the booking per month
    /// </summary>
    /// <param name="year"></param>
    /// <param name="month"></param>
    Task<List<BookingObject>> GetBooking(int year, int month);
    
    /// <summary>
    /// Gets the booking on DateTime range
    /// </summary>
    /// <param name="start"></param>
    /// <param name="end"></param>
    Task<List<BookingObject>> GetBooking(DateTime start, DateTime end);
}
