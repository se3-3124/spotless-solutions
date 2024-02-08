#pragma warning disable CS8618

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SpotlessSolutions.Web.Data.Models;

public class AddOnServiceFieldObject
{
    [Key]
    public Guid Id { get; set; }
    
    public required string GroupId { get; set; }
    public required AddOnServiceFieldType Type { get; set; }
    public required string Name { get; set; }
    public required AddOnServiceFieldParameterType FieldType { get; set; }
    public string? Parameters { get; set; }
    public string? ParameterValueFor { get; set; }
    
    public required Guid AddOnServiceDescriptorId { get; set; }
    [ForeignKey(nameof(AddOnServiceDescriptorId))]
    public AddOnServiceDescriptor AddOnServiceDescriptor { get; set; }
}
