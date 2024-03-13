using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Distributed;
using SpotlessSolutions.DataBucketSdk;
using SpotlessSolutions.ServiceLibrarySdk.ReturnTypes;
using SpotlessSolutions.Web.Data;
using SpotlessSolutions.Web.Data.Models;
using SpotlessSolutions.Web.Extensions;
using SpotlessSolutions.Web.Services.Mailer;
using SpotlessSolutions.Web.Services.Services;

namespace SpotlessSolutions.Web.Services.Bookings;

public class BookingManager : IBookingManager
{
    private readonly IDataBucket _bucket;
    private readonly IDistributedCache _cache;
    private readonly DataContext _context;
    private readonly ILogger<BookingManager> _logger;
    private readonly IMailer _mailer;
    private readonly IServiceRegistry _registry;

    public BookingManager(
        IDataBucket bucket,
        IDistributedCache cache,
        DataContext context,
        ILogger<BookingManager> logger,
        IMailer mailer,
        IServiceRegistry registry)
    {
        _bucket = bucket;
        _cache = cache;
        _context = context;
        _logger = logger;
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

    public async Task<bool> ScheduleBooking(Guid userId, BookingRequestObject bookingRequest)
    {
        var user = await _context.UserData
            .FirstOrDefaultAsync(x => x.Id.Equals(userId));
        if (user == null)
        {
            _logger.LogWarning("Booking requested with ID that doesn't exist: {id}", userId);
            return false;
        }

        var address = await _context.Addresses
            .FirstOrDefaultAsync(x => x.Id.Equals(bookingRequest.AddressId) && x.UserDataId.Equals(userId));
        if (address == null)
        {
            _logger.LogWarning("Booking requested with address ID that doesn't exist: {id} on user id {userId}",
                bookingRequest.AddressId,
                userId);
            return false;
        }

        var service = GetDescriptor(bookingRequest.MainServiceId, bookingRequest.MainServiceConfig);
        if (service == null)
        {
            return false;
        }

        var receipts = new List<ServiceCalculationDescriptor>();
        foreach (var (key, value) in bookingRequest.Addons)
        {
            var item = GetDescriptor(key, value);
            if (item == null)
            {
                return false;
            }
            
            receipts.Add(item);
        }

        var total = receipts.Sum(x => x.CalculatedValue);

        try
        {
            await _context.Bookings.AddAsync(new Booking
            {
                MainServiceId = bookingRequest.MainServiceId,
                MainServiceConfiguration = bookingRequest.MainServiceConfig,
                Addons = bookingRequest.Addons,
                Schedule = bookingRequest.Schedule
                    .ToUniversalTime(),
                FinalPrice = total,
                UserId = userId,
                AddressId = bookingRequest.AddressId,
                Status = BookingStatus.Pending
            });
            await _context.SaveChangesAsync();

            return true;
        }
        catch
        {
            return false;
        }
    }

    public async Task<Guid> UploadAttachment(Guid userId, string objectName, Stream fileUploadStream)
    {
        if (fileUploadStream.Length > 10485760)
        {
            return Guid.Empty;
        }
        
        var user = await _context.UserData
            .FirstOrDefaultAsync(x => x.Id.Equals(userId));
        if (user == null)
        {
            _logger.LogWarning("File upload requested from user that doesn't exist: {id}", userId);
            return Guid.Empty;
        }

        var result = await _bucket.StoreFileToBucket(fileUploadStream, objectName);
        if (result == null)
        {
            return Guid.Empty;
        }

        var data = await _context.Bucket.AddAsync(new FileUploadBucket
        {
            BucketId = result.BucketId,
            FileSize = fileUploadStream.Length,
            OwnerId = user.Id
        });

        await _context.SaveChangesAsync();
        return data.Entity.Id;
    }

    public async Task<PullResult?> GetAttachment(Guid userId, Guid attachmentId)
    {
        // Check cache first
        var cache = await _cache.GetRecordAsync<PullResult>($"BucketReq_{userId}-b{attachmentId}");
        if (cache != null)
        {
            if (File.Exists(cache.TemporaryStoredPath))
            {
                return cache;
            }
        }

        var bucketData = await _context.Bucket
            .FirstOrDefaultAsync(x => x.OwnerId == userId && x.Id == attachmentId);
        if (bucketData == null)
        {
            return null;
        }

        var result = await _bucket.GetFileFromBucket(bucketData.BucketId);
        if (result != null)
        {
            await _cache.SetRecordAsync(
                $"BucketReq_{bucketData.OwnerId}-b{bucketData.Id}",
                result,
                absoluteExpireTime: TimeSpan.FromHours(10));
        }

        return result;
    }

    private ServiceCalculationDescriptor? GetDescriptor(string id, string config)
    {
        var service = _registry.GetActivatedServiceInstance(id);
        if (service == null)
        {
            _logger.LogWarning("Service ID does not exist: {id}", id);
            return null;
        }

        var isCalculated = service.TryCalculate(config, out var calculated);
        if (isCalculated && calculated != null)
        {
            return calculated;
        }
        
        _logger.LogWarning("Calculation configuration is invalid: {config}", config);
        return null;
    }
}
