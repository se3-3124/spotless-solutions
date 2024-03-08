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
