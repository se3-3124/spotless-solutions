#pragma warning disable CS8618

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SpotlessSolutions.Web.Data.Models;

public class ServiceDescriptorPricingPreset
{
    [Key]
    public Guid Id { get; set; }
    
    public required string Name { get; set; }
    public required string ConfigOverrides { get; set; }
    
    public required Guid ServiceDescriptorId { get; set; }
    [ForeignKey(nameof(ServiceDescriptorId))]
    public ServiceDescriptor ServiceDescriptor { get; set; }
}
