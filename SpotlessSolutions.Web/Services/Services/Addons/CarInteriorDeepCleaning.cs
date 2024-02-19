namespace SpotlessSolutions.Web.Services.Services.Addons;

public class CarInteriorDeepCleaning : AddOnStandalone, IAddon
{
    public override float Calculate(float[] values)
    {
        var type = ParseCarType(values[0]);
        var serviceType = ParseServiceType(values[1]);
        var count = values[2];

        var basePrice = type switch
        {
            CarType.Hatchback => GetBasePrice((250, 2500), serviceType),
            CarType.Sedan => GetBasePrice((250, 2500), serviceType),
            CarType.Mpv => GetBasePrice((250, 3000), serviceType),
            CarType.Suv => GetBasePrice((400, 3500), serviceType),
            CarType.PickUp => GetBasePrice((400, 3500), serviceType),
            CarType.Van => GetBasePrice((500, 4000), serviceType),
            _ => throw new ArgumentOutOfRangeException(nameof(values))
        };

        return basePrice * count;
    }

    private static float GetBasePrice((float, float) priceTiers, CarServiceType type)
    {
        return type switch
        {
            CarServiceType.WashShampoo => priceTiers.Item1,
            CarServiceType.WashDeep => priceTiers.Item2,
            _ => throw new ArgumentOutOfRangeException(nameof(type))
        };
    }

    private static CarType ParseCarType(float value)
    {
        return value switch
        {
            >= 1.0f and 2f => CarType.Hatchback,
            >= 2.0f and 3f => CarType.Sedan,
            >= 3.0f and 4f => CarType.Mpv,
            >= 4.0f and 5f => CarType.Suv,
            >= 5.0f and 6f => CarType.PickUp,
            >= 6.0f and 7f => CarType.Van,
            _ => throw new ArgumentOutOfRangeException(nameof(value))
        };
    }

    private static CarServiceType ParseServiceType(float value)
    {
        return value switch
        {
            >= 1.0f and 2f => CarServiceType.WashShampoo,
            >= 2.0f and 3f => CarServiceType.WashDeep,
            _ => throw new ArgumentOutOfRangeException(nameof(value))
        };
    }

    public override string GetId()
    {
        return "addon.car-interior-deep-cleaning";
    }
}
