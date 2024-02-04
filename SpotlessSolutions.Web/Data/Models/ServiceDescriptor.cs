#pragma warning disable CS8618

using System.ComponentModel.DataAnnotations;

namespace SpotlessSolutions.Web.Data.Models;

public class ServiceDescriptor
{
    [Key]
    public Guid Id { get; set; }
    
    [Required]
    public required string Name { get; set; }

    public string? Description { get; set; }

    // ReSharper disable once CollectionNeverQueried.Global
    public required List<ServiceDescriptorPricingFlags> PricingFlags { get; set; }
}
