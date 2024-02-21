namespace SpotlessSolutions.Web.Services.Services.Addons;

public class AirconCleaning : AddOnStandalone, IAddon
{
    private readonly Dictionary<string, float> _pricingConfig;
    
    public AirconCleaning()
    {
        Id = "addon.aircon-cleaning";
        Name = "Aircon Cleaning";

        _pricingConfig = new Dictionary<string, float>
        {
            {
                "0.75_w", 599
            },
            {
                "0.75_stb", 0
            },
            {
                "0.75_stf", 0
            },
            {
                "1.0_w", 699
            },
            {
                "1.0_stb", 1199
            },
            {
                "1.0_stf", 1499
            },
            {
                "2.0_w", 899
            },
            {
                "2.0_stb", 1399
            },
            {
                "2.0_stf", 1699
            },
            {
                "2.5_w", 999
            },
            {
                "2.5_stb", 1599
            },
            {
                "2.5_stf", 1899
            }
        };
    }
    
    public bool RequireTransportFee()
    {
        throw new NotImplementedException();
    }

    public override float Calculate(float[] values)
    {
        var size = values[0];
        var type = ParseType(values[1]);
        var count = values[2];

        var (window, splitBlower, splitFull) = GetBasePriceFromSize(size);
        return type switch
        {
            AirconTypes.Window => window * count,
            AirconTypes.SplitTypeBlower => splitBlower * count,
            AirconTypes.SplitTypeFull => splitFull * count,
            _ => throw new ArgumentOutOfRangeException(nameof(values))
        };
    }

    public override void UpdateConfiguration(string name, string description, string serviceConfig)
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

            if (type != "float")
            {
                continue;
            }
            
            if (float.TryParse(value, out var priceValue))
            {
                _pricingConfig[key] = priceValue;
            }
        }
    }

    private static AirconTypes ParseType(float value)
    {
        return value switch
        {
            >= 1 and < 2 => AirconTypes.Window,
            >= 2 and < 3 => AirconTypes.SplitTypeBlower,
            >= 3 and < 4 => AirconTypes.SplitTypeFull,
            _ => throw new ArgumentOutOfRangeException(nameof(value))
        };
    }

    private float GetValueFromKey(string key)
    {
        return _pricingConfig[key];
    }

    private (float, float, float) GetBasePriceFromSize(float value)
    {
        return value switch
        {
            <= 0.75f => (GetValueFromKey("0.75_w"), 0, 0),
            >= 1.0f and < 1.5f => (GetValueFromKey("1.0_w"), GetValueFromKey("1.0_stb"), GetValueFromKey("1.0_stf")),
            >= 2.0f and < 2.5f => (GetValueFromKey("2.0_w"), GetValueFromKey("2.0_stb"), GetValueFromKey("2.0_stf")),
            >= 2.5f => (GetValueFromKey("2.5_w"), GetValueFromKey("2.5_stb"), GetValueFromKey("2.5_stf")),
            _ => throw new ArgumentOutOfRangeException(nameof(value))
        };
    }
}
