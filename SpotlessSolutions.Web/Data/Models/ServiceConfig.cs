#pragma warning disable CS8618

using System.ComponentModel.DataAnnotations;

namespace SpotlessSolutions.Web.Data.Models;

public class ServiceConfig
{
    [Key]
    public Guid Id { get; set; }
    
    public required string TargetingServiceId { get; set; }
    public required string Name { get; set; }
    public required string Description { get; set; }
    
    // Configuration looks like this: <name>:<type>:<value> separated by comma
    public required string ServiceConfiguration { get; set; }
}
