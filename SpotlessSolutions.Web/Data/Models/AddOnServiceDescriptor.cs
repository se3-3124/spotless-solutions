using System.ComponentModel.DataAnnotations;

namespace SpotlessSolutions.Web.Data.Models;

public class AddOnServiceDescriptor
{
    [Key]
    public Guid Id { get; set; }
    
    [Required]
    public required string Name { get; set; }

    public bool AllowStandalone { get; set; } = false;
    public bool AssessmentOnly { get; set; }
}
