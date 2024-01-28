using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SpotlessSolutions.Web.Data.Models;

public class UserBooking
{
    [Key]
    public Guid Id { get; set; }
    
    /// <summary>
    /// Booking submitted date
    /// </summary>
    public required DateTime IssuedAt { get; set; }
    
    /// <summary>
    /// Current status of booking
    /// </summary>
    public required UserBookingStatus Status { get; set; }
    
    public Guid? ConfigId { get; set; }
    [ForeignKey(nameof(ConfigId))]
    public UserHomeConfigDetail? Config { get; set; }
    
    public required Guid AddressId { get; set; }
    [ForeignKey(nameof(AddressId))]
    public Address Address { get; set; }
    
    public required float TransportFee { get; set; }
    public bool TransportFeeForAssessment { get; set; }

    public required Guid UserId { get; set; }
    [ForeignKey(nameof(UserId))]
    public UserData User { get; set; }
    
    /// <summary>
    /// Path of bucket that contains the uploaded images
    /// </summary>
    public required string BucketPath { get; set; }
}
