using System.Globalization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Distributed;
using SpotlessSolutions.Web.Data;
using SpotlessSolutions.Web.Data.Models;
using SpotlessSolutions.Web.Extensions;

namespace SpotlessSolutions.Web.Services.Booking;

public class BookingManager : IBookingManager
{
    private readonly DataContext _context;
    private readonly IDistributedCache _cache;

    public BookingManager(DataContext context, IDistributedCache cache)
    {
        _context = context;
        _cache = cache;
    }

    private BookingObject ConvertToBookingObject(UserBooking booking)
    {
        var bookingObject = new BookingObject
        {
            Id = booking.Id,
            IssuedDate = booking.IssuedAt,
            Status = booking.Status,
            Address = new Address
            {
                Barangay = booking.Address.Barangay,
                City = booking.Address.City,
                District = booking.Address.District,
                PostalCode = booking.Address.PostalCode,
                Province = booking.Address.Province,
                Street = booking.Address.Street
            },
            TransportFee = booking.TransportFee,
            TransportFeeNeedsAssessment = booking.TransportFeeForAssessment,
            User = new User
            {
                Id = booking.User.Id,
                FirstName = booking.User.FirstName,
                LastName = booking.User.LastName,
                Email = booking.User.User == null ? "unknown email" : booking.User.User.Email
            }
        };

        if (booking.Config != null)
        {
            bookingObject.Config = new BookingHomeConfig
            {
                HomeSize = booking.Config.HomeSize,
                BedroomCount = booking.Config.BedroomCount,
                ComfortRoomCount = booking.Config.ComfortRoomCount,
                FloorCount = booking.Config.FloorCount,
                KitchenCount = booking.Config.KitchenCount,
                LivingRoomCount = booking.Config.LivingRoomCount,
                StorageCount = booking.Config.StorageCount
            };
        }

        var servicesBooked = _context.UserServiceBookDetails
            .Where(x => x.BookingReferenceId == booking.Id)
            .Select(x => new Service
                {
                    Id = x.Id,
                    ServiceId = x.ServiceId,
                    Name = x.Descriptor.Name,
                    TotalCalculation = x.TotalComputedFee
                })
            .ToList();

        var addOnsBooked = _context.UserAddOnBookDetails
            .Where(x => x.BookingReferenceId == booking.Id)
            .Select(x => new AddOns
            {
                Id = x.Id,
                AddOnId = x.ServiceId,
                Name = x.Descriptor.Name,
                TotalCalculation = x.TotalComputedFee
            })
            .ToList();

        var totalComputed = servicesBooked.Sum(x => x.TotalCalculation)
                              + addOnsBooked.Sum(x => x.TotalCalculation);

        bookingObject.ServicesBooked = servicesBooked;
        bookingObject.AddOnsBooked = addOnsBooked;
        bookingObject.TotalComputed = totalComputed;

        return bookingObject;
    }
    
    public async Task<List<BookingObject>> GetAllBookings(int year, int month)
    {
        var cache = await _cache.GetRecordAsync<List<BookingObject>>($"barc_y{year}_m{month}");
        if (cache != null)
        {
            return cache;
        }

        var start = new DateTime(year, month, 1).ToUniversalTime();
        var end = new DateTime(year, month, DateTime.DaysInMonth(year, month));

        var bookings = await _context.UserBookings
            .Where(x => x.IssuedAt >= start && x.IssuedAt <= end)
            .Include(userBooking => userBooking.Config)
            .Include(userBooking => userBooking.Address)
            .Include(userBooking => userBooking.User)
            .Include(userBooking => userBooking.User.User)
            .ToListAsync();

        var result = bookings
            .Select(ConvertToBookingObject)
            .ToList();

        await _cache
            .SetRecordAsync($"barc_y{year}_m{month}", result, absoluteExpireTime: TimeSpan.FromMinutes(5));

        return result;
    }
    
    public async Task<List<BookingObject>> GetAllBookings(DateTime start, DateTime end)
    {
        var cache = await _cache
            .GetRecordAsync<List<BookingObject>>(
                $"barc_ds{start.ToString(CultureInfo.InvariantCulture)}_de{end.ToString(CultureInfo.InvariantCulture)}");
        if (cache != null)
        {
            return cache;
        }
        
        var bookings = await _context.UserBookings
            .Where(x => x.IssuedAt >= start && x.IssuedAt <= end)
            .Include(userBooking => userBooking.Config)
            .Include(userBooking => userBooking.Address)
            .Include(userBooking => userBooking.User)
            .Include(userBooking => userBooking.User.User)
            .ToListAsync();

        var result = bookings
            .Select(ConvertToBookingObject)
            .ToList();
        
        await _cache
            .SetRecordAsync($"barc_ds{start.ToString(CultureInfo.InvariantCulture)}_de{end.ToString(CultureInfo.InvariantCulture)}",
                result, absoluteExpireTime: TimeSpan.FromMinutes(5));

        return result;
    }
}
