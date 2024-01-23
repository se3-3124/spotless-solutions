namespace SpotlessSolutions.Web.Data.Models;

public class ServiceDescriptorPricingRule
{
    public required ServiceDescriptorPricingRuleType Type { get; set; }
    public required string PricingConfig { get; set; }
}
