using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SpotlessSolutions.Web.Data.Models;

public class ServiceDescriptorPricingRule
{
    [Key]
    public Guid Id { get; set; }
    
    public required ServiceDescriptorPricingRuleType Type { get; set; }
    public required string PricingConfig { get; set; }
    
    public required Guid ServiceDescriptorId { get; set; }
    [ForeignKey(nameof(ServiceDescriptorId))]
    public ServiceDescriptor ServiceDescriptor { get; set; }
}
