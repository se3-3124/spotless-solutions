using Microsoft.EntityFrameworkCore;
using SpotlessSolutions.Web.Data;
using SpotlessSolutions.Web.Data.Models;
using SpotlessSolutions.Web.Extensions;
using SpotlessSolutions.Web.Services.Mailer;
using SpotlessSolutions.Web.Services.Services;

namespace SpotlessSolutions.Web.Services.Bookings;

public class BookingManager : IBookingManager
{
    private readonly DataContext _context;
    private readonly IMailer _mailer;
    private readonly IServiceRegistry _registry;

    public BookingManager(DataContext context, IMailer mailer, IServiceRegistry registry)
    {
        _context = context;
        _mailer = mailer;
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

    public async Task<bool> SendEmail(Guid userId, string subject, string body)
    {
        var user = await _context.UserData
            .Include(x => x.User)
            .FirstOrDefaultAsync(x => x.Id.Equals(userId));

        if (user?.User == null || string.IsNullOrEmpty(user.User.Email))
        {
            return false;
        }

        await _mailer.Send(new MailSettings
        {
            Recipient = new MailSettings.UserData
            {
                Address = user.User.Email,
                Name = $"{user.LastName}, {user.FirstName}"
            },
            Subject = subject,
            Body = body
        });

        return true;
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
                var mainService = _registry.GetActivatedServiceInstance(x.MainServiceId)!;
                var mainServiceParams = x.MainServiceConfiguration.GetCalculationParams()!;
                var mainServiceCalculation = mainService.Calculate(mainServiceParams);
                
                var mainServiceDetail = new ServiceDetailConfig
                {
                    Service = new ServiceDetails
                    {
                        Name = mainService.GetName(),
                        Description = mainService.GetDescription(),
                        Id = mainService.GetId(),
                        Type = mainService.GetServiceType()
                    },
                    BookingDescriptor = mainServiceCalculation.Descriptors,
                    Calculated = mainServiceCalculation.CalculatedValue
                };

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
            .Select(data =>
            {
                var service = _registry.GetActivatedServiceInstance(data.Key)!;
                var config = data.Value.GetCalculationParams()!;

                var calculation = service.Calculate(config);

                return new ServiceDetailConfig
                {
                    Service = new ServiceDetails
                    {
                        Name = service.GetName(),
                        Description = service.GetDescription(),
                        Id = service.GetId(),
                        Type = service.GetServiceType(),
                    },
                    BookingDescriptor = calculation.Descriptors,
                    Calculated = calculation.CalculatedValue
                };
            })
            .ToList();
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
