namespace SpotlessSolutions.Web.Data.Models;

public enum ServiceDescriptorPricingRuleType
{
    /// <summary>
    /// Fixed pricing until reaches threshold configuration
    /// </summary>
    FixedNotExceeding,
    /// <summary>
    /// Increasing pricing configuration
    ///
    /// Config syntax: [start], [starting_price], [increment_every], [increment_price]
    /// <example>
    /// Setting up a service with a following requirements:
    /// Starting price at 100 when 35km or greater and increases by 50 every 2km
    /// Therefore, the config value should be:
    /// 35,100,2,50
    /// </example>
    /// </summary>
    Incremental
}
