#pragma warning disable CS8618

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SpotlessSolutions.Web.Data.Models;

public class UserAddOnBookDetail
{
    [Key]
    public Guid Id { get; set; }
    
    public required float TotalComputedFee { get; set; }
    public required string ServiceArguments { get; set; }
    
    public Guid BookingReferenceId { get; set; }
    [ForeignKey(nameof(BookingReferenceId))]
    public UserBooking BookingReference { get; set; }
    
    public Guid ServiceId { get; set; }
    [ForeignKey(nameof(ServiceId))]
    public AddOnServiceDescriptor Descriptor { get; set; }
}
