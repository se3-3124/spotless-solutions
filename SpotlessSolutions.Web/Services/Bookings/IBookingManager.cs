using SpotlessSolutions.DataBucketSdk;
using SpotlessSolutions.Web.Data.Models;

namespace SpotlessSolutions.Web.Services.Bookings;

public interface IBookingManager
{
    /// <summary>
    /// Update booking state
    /// </summary>
    /// <param name="id"></param>
    /// <param name="targetState"></param>
    /// <returns></returns>
    Task<bool> UpdateBookingState(Guid id, BookingStatus targetState);

    /// <summary>
    /// Send email to the user
    /// </summary>
    /// <param name="userId"></param>
    /// <param name="subject"></param>
    /// <param name="body"></param>
    /// <returns></returns>
    Task<bool> SendEmail(Guid userId, string subject, string body);

    /// <summary>
    /// Schedule a booking
    /// </summary>
    /// <param name="userId"></param>
    /// <param name="bookingRequest"></param>
    /// <returns></returns>
    Task<bool> ScheduleBooking(Guid userId, BookingRequestObject bookingRequest);

    /// <summary>
    /// Upload a file for booking
    /// </summary>
    /// <param name="userId"></param>
    /// <param name="objectName"></param>
    /// <param name="fileUploadStream"></param>
    /// <returns></returns>
    Task<Guid> UploadAttachment(Guid userId, string objectName, Stream fileUploadStream);

    /// <summary>
    /// Retrieves the bucket data
    /// </summary>
    /// <param name="userId"></param>
    /// <param name="attachmentId"></param>
    /// <returns></returns>
    Task<PullResult?> GetAttachment(Guid userId, Guid attachmentId);
}
