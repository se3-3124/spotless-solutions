using System.ComponentModel.DataAnnotations;

namespace SpotlessSolutions.Web.Data.Models;

public class AddOnServiceDescriptor
{
    [Key]
    public Guid Id { get; set; }
    
    [Required]
    public required string Name { get; set; }

    public bool AllowStandalone { get; set; } = false;
    public required List<AddOnServiceFieldObject> Fields { get; set; }
    public List<AddOnServiceRestrictionRule>? Restrictions { get; set; }
    public bool AssessmentOnly { get; set; }
}
