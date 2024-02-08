#pragma warning disable CS8618

using System.ComponentModel.DataAnnotations;

namespace SpotlessSolutions.Web.Data.Models;

public class AddOnServiceDescriptor
{
    [Key]
    public Guid Id { get; set; }
    
    [Required]
    public required string Name { get; set; }

    public bool AllowStandalone { get; set; }
    public bool AssessmentOnly { get; set; }
}
