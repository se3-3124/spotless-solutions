namespace SpotlessSolutions.Web.Services.Services.Addons;

public class MattressDeepAddOn : AddOnStandalone, IAddon
{
    private readonly Dictionary<string, float> _pricingConfig;
    
    public MattressDeepAddOn()
    {
        Id = "addon.mattress-deep";
        Name = "Mattress Deep Cleaning";

        _pricingConfig = new Dictionary<string, float>
        {
            { "single", 1200 },
            { "semidouble", 1500 },
            { "double", 2000 },
            { "queen", 2000 },
            { "kingsize", 2500 }
        };
    }
    
    public override float Calculate(float[] values)
    {
        var size = ParseSize(values[0]);
        var count = values[1];

        if (count <= 1)
        {
            throw new ArgumentOutOfRangeException(nameof(values));
        }

        return size switch
        {
            MattressDeepSize.Single => _pricingConfig["single"] * count,
            MattressDeepSize.SemiDouble => _pricingConfig["semidouble"] * count,
            MattressDeepSize.Double => _pricingConfig["double"] * count,
            MattressDeepSize.Queen => _pricingConfig["queen"] * count,
            MattressDeepSize.KingSize => _pricingConfig["kingsize"] * count,
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

            if (float.TryParse(value, out var value1))
            {
                _pricingConfig[key] = value1;
            }
        }
    }

    private MattressDeepSize ParseSize(float value)
    {
        return value switch
        {
            >= 29 and < 31 => MattressDeepSize.Single,
            >= 47 and < 49 => MattressDeepSize.SemiDouble,
            >= 53 and < 55 => MattressDeepSize.Double,
            >= 59 and < 61 => MattressDeepSize.Queen,
            >= 71 and < 73 => MattressDeepSize.KingSize,
            _ => throw new ArgumentOutOfRangeException(nameof(value))
        };
    }
}
