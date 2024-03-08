using Microsoft.EntityFrameworkCore;
using SpotlessSolutions.Web.Data;
using SpotlessSolutions.Web.Data.Models;
using SpotlessSolutions.Web.Extensions;
using SpotlessSolutions.Web.Services.Services;

namespace SpotlessSolutions.Web.Services.Bookings;

public class BookingQuery : IBookingQuery
{
    private readonly DataContext _context;
    private readonly IServiceRegistry _registry;

    public BookingQuery(DataContext context, IServiceRegistry registry)
    {
        _context = context;
        _registry = registry;
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
            .Where(x =>
            {
                var service = _registry.GetActivatedServiceInstance(x.MainServiceId);
                if (service == null)
                {
                    return false;
                }

                return x.MainServiceConfiguration.GetCalculationParams() != null;
            })
            .Select(x =>
            {
                var mainServiceDetail = ParseConfigFromContext(x.MainServiceId, x.MainServiceConfiguration, ServiceType.Main)!;
                var addons = MapAddons(x);

                var user = new User
                {
                    FirstName = x.User.FirstName,
                    LastName = x.User.LastName,
                    UserId = x.User.Id
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

    /// <summary>
    /// Parse configuration from context
    /// </summary>
    /// <param name="serviceId">ID of the service</param>
    /// <param name="configuration">Booked service configuration</param>
    /// <param name="expectedServiceType">Expected service type</param>
    /// <returns>
    /// Returns null when service type does not match or service does not exist
    /// </returns>
    private ServiceDetailConfig? ParseConfigFromContext(string serviceId, string configuration, ServiceType expectedServiceType)
    {
        var service = _registry.GetActivatedServiceInstance(serviceId);
        if (service == null)
        {
            return null;
        }

        if (service.GetServiceType() != expectedServiceType)
        {
            return null;
        }

        var serviceParams = configuration.GetCalculationParams();
        if (serviceParams == null)
        {
            return null;
        }

        var calculated = service.Calculate(serviceParams);
        return new ServiceDetailConfig
        {
            Service = new ServiceDetails
            {
                Id = service.GetId(),
                Name = service.GetName(),
                Type = service.GetServiceType(),
                Description = service.GetDescription()
            },
            BookingDescriptor = calculated.Descriptors,
            Calculated = calculated.CalculatedValue
        };
    }

    private List<ServiceDetailConfig> MapAddons(Booking booking)
    {
        return booking.Addons
            .Where(data =>
            {
                var instance = _registry.GetActivatedServiceInstance(data.Key);
                if (instance == null)
                {
                    return false;
                }

                return instance.GetServiceType() == ServiceType.Addons &&
                       data.Value.GetCalculationParams() != null;
            })
            .Select(x => ParseConfigFromContext(x.Key, x.Value, ServiceType.Addons)!)
            .ToList();
    }
}
