using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SpotlessSolutions.Web.Data.Models;

public class UserServiceBookDetail
{
    [Key]
    public Guid Id { get; set; }
    
    public required float TotalComputedFee { get; set; }
    public required string ServiceArguments { get; set; }
    
    public required Guid BookingReferenceId { get; set; }
    [ForeignKey(nameof(BookingReferenceId))]
    public UserBooking BookingReference { get; set; }
    
    public required Guid ServiceId { get; set; }
    [ForeignKey(nameof(ServiceId))]
    public ServiceDescriptor Descriptor { get; set; }
}
