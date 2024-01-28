using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SpotlessSolutions.Web.Data.Models;

public class Address
{
    [Key]
    public Guid Id { get; set; }

    public required string Street { get; set; }
    public required string District { get; set; }
    public required string Barangay { get; set; }
    public required string PostalCode { get; set; }
    public required string City { get; set; }
    public required string Province { get; set; }
    
    public Guid UserDataId { get; set; }

    [ForeignKey(nameof(UserDataId))]
    public UserData User { get; set; }
}
