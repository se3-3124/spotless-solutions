using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

#pragma warning disable CS8618

namespace SpotlessSolutions.Web.Data.Models;

public class Booking
{
    [Key]
    public Guid Id { get; set; }
    
    public required string MainServiceId { get; set; }
    public required string MainServiceConfiguration { get; set; }
    
    public required Dictionary<string, string> Addons { get; set; }
    
    public required float FinalPrice { get; set; }
    public required DateTime Schedule { get; set; }
    
    public required BookingStatus Status { get; set; }
    
    public required Guid UserId { get; set; }

    [ForeignKey(nameof(UserId))]
    public UserData User { get; set; }
    
    public required Guid AddressId { get; set; }
    
    [ForeignKey(nameof(AddressId))]
    public Address Address { get; set; }
}
