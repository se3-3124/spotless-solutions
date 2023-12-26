using System.ComponentModel.DataAnnotations;

namespace SpotlessSolutions.Web.Data.Models;

public class Services
{
    [Key]
    public Guid Id { get; set; }
    
    [Required]
    public string Name { get; set; }
    
    [Required]
    public string Config { get; set; }
}
