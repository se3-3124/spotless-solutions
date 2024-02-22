#pragma warning disable CS8618

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SpotlessSolutions.Web.Data.Models;

public class AddOnServiceRestrictionRule
{
    [Key]
    public Guid Id { get; set; }

    public required ServiceBookedType On { get; set; }
    public required string FieldId { get; set; }
    public required string Parameters { get; set; }
    public required string Message { get; set; }
    
    public required Guid AddOnServiceDescriptorId { get; set; }
    [ForeignKey(nameof(AddOnServiceDescriptorId))]
    public AddOnServiceDescriptor AddOnServiceDescriptor { get; set; }
}
