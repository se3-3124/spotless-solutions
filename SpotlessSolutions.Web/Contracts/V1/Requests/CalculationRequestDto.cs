// ReSharper disable CollectionNeverUpdated.Global
// ReSharper disable UnusedAutoPropertyAccessor.Global
#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.

namespace SpotlessSolutions.Web.Contracts.V1.Requests;

public class CalculationRequestDto
{
    public Dictionary<string, string> Items { get; init; }
}
