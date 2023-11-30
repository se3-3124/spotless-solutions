using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SpotlessSolutions.Web.Data.Models;

public class Address
{
    [Key]
    public Guid Id { get; set; }

    public string Street { get; set; } = string.Empty;
    public string District { get; set; } = string.Empty;
    public string Barangay { get; set; } = string.Empty;
    public string PostalCode { get; set; } = string.Empty;
    public string City { get; set; } = string.Empty;
    public string Province { get; set; } = string.Empty;
    
    public Guid UserDataId { get; set; }

    [ForeignKey(nameof(UserDataId))]
    public UserData User { get; set; }
}
