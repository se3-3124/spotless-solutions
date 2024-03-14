// ReSharper disable UnusedType.Global

using System.Text;
using SpotlessSolutions.ServiceLibrary.Addons.Bundle.InternalTypes;
using SpotlessSolutions.ServiceLibrarySdk;
using SpotlessSolutions.ServiceLibrarySdk.ReturnTypes;

namespace SpotlessSolutions.ServiceLibrary.Addons.Bundle.Standalone;

public class AirconCleaning : BaseAddon, IService
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

    public override bool TryCalculate(string value, out ServiceCalculationDescriptor? calculationDescriptor)
    {
        var parameters = Parse<AirconCleaningParameters>(value);
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

        var basePrice = GetBasePrice(parameters.HorsePower, parameters.Type, parameters.CleaningType);
        if (basePrice <= 0)
        {
            calculationDescriptor = null;
            return false;
        }

        var cleanDescriptor = parameters.Type switch
        {
            AirconTypes.Window => "Window",
            AirconTypes.SplitType when parameters.CleaningType == AirconCleaningType.BlowerOnly => "Split Type Aircon (Blower Only)",
            _ => "Split Type Aircon (Full Cleaning)"
        };

        calculationDescriptor = new ServiceCalculationDescriptor
        {
            Id = Id,
            Name = Name,
            CalculatedValue = basePrice * parameters.Count,
            Descriptors =
            [
                [ $"{parameters.HorsePower} hp" ],
                [ cleanDescriptor, $"x{parameters.Count}" ]
            ],
            SensitiveDescriptors = [],
            RequiresAssessment = false
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

            if (float.TryParse(value, out var priceValue))
            {
                _pricingConfig[key] = priceValue;
            }
        }
    }

    public override ServiceExportObject ToExportObject()
    {
        var config = new StringBuilder();
        config.Append($"0.75_w:float:{GetValueFromKey("0.75_w")},");
        config.Append("0.75_stb:float:0,");
        config.Append("0.75_stf:float:0,");
        config.Append($"1.0_w:float:{GetValueFromKey("1.0_w")},");
        config.Append($"1.0_stb:float:{GetValueFromKey("1.0_stb")},");
        config.Append($"1.0_stf:float:{GetValueFromKey("1.0_stf")},");
        config.Append($"2.0_w:float:{GetValueFromKey("2.0_w")},");
        config.Append($"2.0_stb:float:{GetValueFromKey("2.0_stb")},");
        config.Append($"2.0_stf:float:{GetValueFromKey("2.0_stf")},");
        config.Append($"2.5_w:float:{GetValueFromKey("2.5_w")},");
        config.Append($"2.5_stb:float:{GetValueFromKey("2.5_stb")},");
        config.Append($"2.5_stf:float:{GetValueFromKey("2.5_stf")}");

        return new ServiceExportObject
        {
            Id = Id,
            Name = Name,
            Description = Description,
            Config = config.ToString(),
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
                Id = "ac-type",
                Label = "Aircon Type",
                ConfigId = "type",
                Type = ServiceFieldType.Select,
                SupportedValues =
                [
                    [ "0", "Window" ],
                    [ "1", "Split Type"]
                ]
            },
            new ServiceFieldObject
            {
                Id = "ac-size",
                Label = "Aircon Size",
                ConfigId = "horsepower",
                Type = ServiceFieldType.InputNumeric,
                Restrictions = new Dictionary<string, string>
                {
                    { "min", "0.75" },
                    { "max", "2.5" }
                }
            },
            new ServiceFieldObject
            {
                Id = "ac-clean-type",
                Label = "Type of Cleaning",
                ConfigId = "cleaning_type",
                Type = ServiceFieldType.Select,
                SupportedValues =
                [
                    [ "0", "Blower Only" ],
                    [ "1", "Full Cleaning" ]
                ]
            },
            new ServiceFieldObject
            {
                Id = "ac-count",
                Label = "Number of aircons to be cleaned",
                ConfigId = "count",
                Type = ServiceFieldType.InputNumeric,
                Restrictions = new Dictionary<string, string>
                {
                    { "min", "1" }
                }
            }
        ];
    }

    private float GetValueFromKey(string key)
    {
        return _pricingConfig[key];
    }

    private float GetBasePrice(float horsePower, AirconTypes type, AirconCleaningType cleaningType)
    {
        var configKey = horsePower switch
        {
            > 0 and < 1 => "0.75",
            >= 1.0f and < 1.5f => "1.0",
            >= 1.5f and < 2.0f => "1.5",
            >= 2.0f and < 2.5f => "2.0",
            _ => "2.5",
        };

        configKey += type switch
        {
            AirconTypes.Window => "_w",
            AirconTypes.SplitType when cleaningType == AirconCleaningType.BlowerOnly => "_stb",
            _ => "_stf"
        };

        var isBasePriceMatched = _pricingConfig.TryGetValue(configKey, out var basePrice);
        if (!isBasePriceMatched)
        {
            // Return to 0 if not matched.
            return 0;
        }

        return basePrice;
    }
}
