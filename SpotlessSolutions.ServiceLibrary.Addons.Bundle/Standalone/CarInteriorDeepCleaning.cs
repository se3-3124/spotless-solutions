using SpotlessSolutions.ServiceLibrary.Addons.Bundle.InternalTypes;
using SpotlessSolutions.ServiceLibrarySdk;
using SpotlessSolutions.ServiceLibrarySdk.ReturnTypes;

namespace SpotlessSolutions.ServiceLibrary.Addons.Bundle.Standalone;

public class CarInteriorDeepCleaning : BaseAddon, IService
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

    public override bool TryCalculate(string value, out ServiceCalculationDescriptor? calculationDescriptor)
    {
        var parameters = Parse<CarInteriorDeepCleaningParameters>(value);
        if (parameters == null)
        {
            calculationDescriptor = null;
            return false;
        }

        if (parameters.Count <= 0)
        {
            calculationDescriptor = null;
            return false;
        }

        var basePrice = parameters.Type switch
        {
            CarTypes.Hatchback => GetBasePrice("hatchback", parameters.ServiceType),
            CarTypes.Sedan => GetBasePrice("sedan", parameters.ServiceType),
            CarTypes.Mpv => GetBasePrice("mpv", parameters.ServiceType),
            CarTypes.Suv => GetBasePrice("suv", parameters.ServiceType),
            CarTypes.PickUp => GetBasePrice("pickup", parameters.ServiceType),
            _ => GetBasePrice("van", parameters.ServiceType)
        };

        var carTypeDescriptor = parameters.Type switch
        {
            CarTypes.Hatchback => "Hatchback/Compact",
            CarTypes.Sedan => "Sedan",
            CarTypes.Mpv => "MPV",
            CarTypes.Suv => "SUV",
            CarTypes.PickUp => "Pick-up",
            _ => "Van"
        };

        var serviceTypeDescriptor = parameters.ServiceType switch
        {
            CarServiceType.WashShampoo => "Carwash with Shampoo",
            _ => "Interior Deep Cleaning",
        };

        var calculatedPrice = basePrice * parameters.Count;

        calculationDescriptor = new ServiceCalculationDescriptor
        {
            CalculatedValue = calculatedPrice,
            Descriptors =
            [
                [ carTypeDescriptor ],
                [ serviceTypeDescriptor, $"x{parameters.Count}" ]
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

    public override List<ServiceFieldObject> GetSpecificFieldObjects()
    {
        return
        [
            new ServiceFieldObject
            {
                Id = "cdc-car-type-sel",
                Label = "Car Type",
                Type = ServiceFieldType.Select,
                SupportedValues =
                [
                    [ "1", "Hatchback" ],
                    [ "2", "Sedan" ],
                    [ "3", "MPV" ],
                    [ "4", "SUV" ],
                    [ "5", "Pick-up" ],
                    [ "6", "Van" ]
                ]
            },
            new ServiceFieldObject
            {
                Id = "cdc-clean-type-sel",
                Label = "Cleaning Type",
                Type = ServiceFieldType.Select,
                SupportedValues =
                [
                    [ "1", "Carwash with Shampoo" ],
                    [ "2", "Interior Deep Cleaning" ]
                ]
            },
            new ServiceFieldObject
            {
                Id = "cdc-count",
                Label = "Amount of vehicles to clean",
                Type = ServiceFieldType.InputNumeric,
                Restrictions = new Dictionary<string, string>
                {
                    { "min", "1" }
                }
            }
        ];
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
}
