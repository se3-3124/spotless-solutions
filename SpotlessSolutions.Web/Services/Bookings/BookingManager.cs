using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Distributed;
using SpotlessSolutions.Web.Data;
using SpotlessSolutions.Web.Extensions;
using SpotlessSolutions.Web.Services.Services;

namespace SpotlessSolutions.Web.Services.Bookings;

public class BookingManager : IBookingManager
{
    private readonly DataContext _context;
    private readonly IServiceRegistry _registry;
    private readonly IDistributedCache _cache;

    public BookingManager(DataContext context, IServiceRegistry registry, IDistributedCache cache)
    {
        _context = context;
        _registry = registry;
        _cache = cache;
    }

    public async Task<IEnumerable<BookingObject>> GetBooking(int year, int month)
    {
        var start = new DateTime(year, month, 1).ToUniversalTime();
        var end = new DateTime(year, month, DateTime.DaysInMonth(year, month))
            .ToUniversalTime();

        var cache = await _cache.GetRecordAsync<List<BookingObject>>($"bookings_admin_cache-y{year}m{month}");
        if (cache != null)
        {
            return cache;
        }

        var result = (await GetBooking(start, end)).ToList();

        await _cache.SetRecordAsync($"bookings_admin_cache-y{year}m{month}", result, TimeSpan.FromMinutes(5));
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
                        Id = mainService.GetId()
                    },
                    Configuration = x.MainServiceConfiguration
                };

                var addons = x.Addons.Keys
                    .Select(y =>
                    {
                        var service = _registry.GetActivatedAddonInstance(y)!;

                        return new ServiceDetailConfig
                        {
                            Service = new ServiceDetails
                            {
                                Name = service.GetName(),
                                Description = service.GetDescription(),
                                Id = service.GetId()
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
