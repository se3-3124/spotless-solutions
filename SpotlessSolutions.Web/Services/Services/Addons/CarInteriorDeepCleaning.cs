namespace SpotlessSolutions.Web.Services.Services.Addons;

public class CarInteriorDeepCleaning : AddOnStandalone, IService
{
    private readonly Dictionary<string, (float, float)> _pricingConfig;
    
    public CarInteriorDeepCleaning()
    {
        Id = "addon.car-interior-deep-cleaning";
        Name = "Car Interior Deep Cleaning";

        _pricingConfig = new Dictionary<string, (float, float)>
        {
            { "hatchback", (250, 2500) },
            { "sedan", (250, 2500) },
            { "mpv", (250, 3000) },
            { "suv", (400, 3500) },
            { "pickup", (400, 3500) },
            { "van", (500, 4000) }
        };
    }
    
    public override float Calculate(float[] values)
    {
        var type = ParseCarType(values[0]);
        var serviceType = ParseServiceType(values[1]);
        var count = values[2];

        var basePrice = type switch
        {
            CarType.Hatchback => GetBasePrice("hatchback", serviceType),
            CarType.Sedan => GetBasePrice("sedan", serviceType),
            CarType.Mpv => GetBasePrice("mpv", serviceType),
            CarType.Suv => GetBasePrice("suv", serviceType),
            CarType.PickUp => GetBasePrice("pickup", serviceType),
            CarType.Van => GetBasePrice("van", serviceType),
            _ => throw new ArgumentOutOfRangeException(nameof(values))
        };

        return basePrice * count;
    }
    
    public override void UpdateConfig(string name, string description, string serviceConfig)
    {
        Name = name;
        Description = description;
        
        var configs = serviceConfig.Split(",");
        foreach (var config in configs)
        {
            var configDetails = config.Split(":");
            var key = configDetails[0];
            var type = configDetails[1];
            var value = configDetails[2];

            if (!_pricingConfig.ContainsKey(key))
            {
                continue;
            }

            if (type != "(float|float)")
            {
                continue;
            }

            var values = value.Substring(1, value.Length - 1)
                .Split("|");
            if (values.Length != 2)
            {
                continue;
            }

            var float1 = float.TryParse(values[0], out var value1);
            var float2 = float.TryParse(values[1], out var value2);

            if (float1 && float2)
            {
                _pricingConfig[key] = (value1, value2);
            }
        }
    }

    public override ServiceExportObject ToExportObject()
    {
        var config = new List<string>();
        foreach (var (key, value) in _pricingConfig)
        {
            config.Add($"{key}:(float|float):({value.Item1}|{value.Item2})");
        }

        return new ServiceExportObject
        {
            Id = Id,
            Name = Name,
            Description = Description,
            Config = string.Join(",", config),
            Type = ServiceType.Addons,
            Editable = true
        };
    }

    private float GetBasePrice(string key, CarServiceType type)
    {
        var tier = _pricingConfig[key];
        
        return type switch
        {
            CarServiceType.WashShampoo => tier.Item1,
            CarServiceType.WashDeep => tier.Item2,
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
}
