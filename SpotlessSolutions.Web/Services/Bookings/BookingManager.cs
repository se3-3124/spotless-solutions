using Microsoft.EntityFrameworkCore;
using SpotlessSolutions.Web.Data;
using SpotlessSolutions.Web.Data.Models;
using SpotlessSolutions.Web.Services.Services;

namespace SpotlessSolutions.Web.Services.Bookings;

public class BookingManager : IBookingManager
{
    private readonly DataContext _context;
    private readonly IServiceRegistry _registry;

    public BookingManager(DataContext context, IServiceRegistry registry)
    {
        _context = context;
        _registry = registry;
    }

    public async Task<bool> UpdateBookingState(Guid id, BookingStatus targetState)
    {
        var booking = await _context.Bookings
            .FirstOrDefaultAsync(x => x.Id.Equals(id));
        if (booking == null)
        {
            return false;
        }

        booking.Status = targetState;
        _context.Bookings.Update(booking);

        return await _context.SaveChangesAsync() >= 1;
    }

    public async Task<IEnumerable<BookingObject>> GetBooking(int year, int month)
    {
        var start = new DateTime(year, month, 1).ToUniversalTime();
        var end = new DateTime(year, month, DateTime.DaysInMonth(year, month))
            .ToUniversalTime();

        var result = (await GetBooking(start, end)).ToList();
        return result;
    }

    public async Task<IEnumerable<BookingObject>> GetBooking(DateTime start, DateTime end)
    {
        var bookings = await _context.Bookings
            .Include(x => x.User.User)
            .Include(x => x.Address)
            .Where(x => x.Schedule >= start && x.Schedule <= end)
            .ToArrayAsync();

        return bookings
            .Select(x =>
            {
                var mainService = _registry.GetActivatedServiceInstance(x.MainServiceId)!;
                var mainServiceDetail = new ServiceDetailConfig
                {
                    Service = new ServiceDetails
                    {
                        Name = mainService.GetName(),
                        Description = mainService.GetDescription(),
                        Id = mainService.GetId(),
                        Type = mainService.GetServiceType()
                    },
                    Configuration = x.MainServiceConfiguration
                };

                var addons = x.Addons.Keys
                    .Where(id => _registry.GetActivatedServiceInstance(id)?.GetServiceType() == ServiceType.Addons)
                    .Select(y =>
                    {
                        var service = _registry.GetActivatedServiceInstance(y)!;

                        return new ServiceDetailConfig
                        {
                            Service = new ServiceDetails
                            {
                                Name = service.GetName(),
                                Description = service.GetDescription(),
                                Id = service.GetId(),
                                Type = service.GetServiceType()
                            },
                            Configuration = x.Addons[y]
                        };
                    })
                    .ToList();

                var user = new User
                {
                    Email = x.User.User?.Email ?? "",
                    FirstName = x.User.FirstName,
                    LastName = x.User.LastName,
                    UserId = x.Id
                };

                var address = new Address
                {
                    Barangay = x.Address.Barangay,
                    City = x.Address.City,
                    District = x.Address.District,
                    PostalCode = x.Address.PostalCode,
                    Province = x.Address.Province,
                    Street = x.Address.Street
                };

                var status = x.Status;
                
                return new BookingObject(x.Id, x.Schedule, mainServiceDetail, addons, status, user, address, x.FinalPrice);
            });
    }

    public Task<IEnumerable<DateTime>> GetAnonymizedBookingDetails(int year, int month)
    {
        var start = new DateTime(year, month, 1).ToUniversalTime();
        var end = new DateTime(year, month, DateTime.DaysInMonth(year, month))
            .ToUniversalTime();

        return GetAnonymizedBookingDetails(start, end);
    }

    public async Task<IEnumerable<DateTime>> GetAnonymizedBookingDetails(DateTime start, DateTime end)
    {
        var bookings = await _context.Bookings
            .Where(x => x.Schedule >= start && x.Schedule <= end)
            .ToArrayAsync();

        return bookings.Select(x => x.Schedule);
    }
}
