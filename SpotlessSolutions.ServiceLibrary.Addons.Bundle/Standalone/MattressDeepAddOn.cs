using SpotlessSolutions.ServiceLibrary.Addons.Bundle.InternalTypes;
using SpotlessSolutions.ServiceLibrarySdk;
using SpotlessSolutions.ServiceLibrarySdk.ReturnTypes;

namespace SpotlessSolutions.ServiceLibrary.Addons.Bundle.Standalone;

public class MattressDeepAddOn : BaseAddon, IService
{
    private readonly Dictionary<string, float> _pricingConfig;

    public MattressDeepAddOn()
    {
        Id = "addon.mattress-deep";
        Name = "Mattress Deep Cleaning";

        _pricingConfig = new Dictionary<string, float>
        {
            { "single", 1200 },
            { "semi-double", 1500 },
            { "double", 2000 },
            { "queen", 2000 },
            { "king-size", 2500 }
        };
    }

    public override bool TryCalculate(string value, out ServiceCalculationDescriptor? calculationDescriptor)
    {
        var parameters = Parse<MattressDeepAddonParameters>(value);
        if (parameters == null)
        {
            calculationDescriptor = null;
            return false;
        }

        if (parameters.Count < 1)
        {
            calculationDescriptor = null;
            return false;
        }

        var basePrice = parameters.Size switch
        {
            MattressDeepSize.Single => _pricingConfig["single"],
            MattressDeepSize.SemiDouble => _pricingConfig["semi-double"],
            MattressDeepSize.Double => _pricingConfig["double"],
            MattressDeepSize.Queen => _pricingConfig["queen"],
            _ => _pricingConfig["king-size"]
        };

        var bedSizeDescriptor = parameters.Size switch
        {
            MattressDeepSize.Single => "Single",
            MattressDeepSize.SemiDouble => "Semi-Double",
            MattressDeepSize.Double => "Double",
            MattressDeepSize.Queen => "Queen",
            _ => "King Size",
        };

        calculationDescriptor = new ServiceCalculationDescriptor
        {
            CalculatedValue = basePrice * parameters.Count,
            Descriptors =
            [
                [ bedSizeDescriptor, $"x{parameters.Count}" ]
            ]
        };

        return true;
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


    public override ServiceExportObject ToExportObject()
    {
        var config = new List<string>();
        foreach (var (key, value) in _pricingConfig)
        {
            config.Add($"{key}:float:{value}");
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

    public override List<ServiceFieldObject> GetSpecificFieldObjects()
    {
        return
        [
            new ServiceFieldObject
            {
                Id = "md-ad-size-sel",
                Label = "Mattress Size",
                Type = ServiceFieldType.Select,
                SupportedValues =
                [
                    [ "30", "Single (30in.)" ],
                    [ "48", "Semi-Double (48in.)"],
                    [ "54", "Double (54in.)" ],
                    [ "60", "Queen (60in.)" ],
                    [ "72", "King Size (72in.)" ]
                ]
            },
            new ServiceFieldObject
            {
                Id = "md-ad-count",
                Label = "Amount of mattress",
                Type = ServiceFieldType.InputNumeric,
                Restrictions = new Dictionary<string, string>
                {
                    { "min", "1" }
                }
            }
        ];
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
