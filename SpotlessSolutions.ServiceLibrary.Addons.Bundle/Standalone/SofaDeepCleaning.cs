// ReSharper disable UnusedType.Global

using SpotlessSolutions.ServiceLibrary.Addons.Bundle.InternalTypes;
using SpotlessSolutions.ServiceLibrarySdk;
using SpotlessSolutions.ServiceLibrarySdk.ReturnTypes;

namespace SpotlessSolutions.ServiceLibrary.Addons.Bundle.Standalone;

public class SofaDeepCleaning : BaseAddon, IService
{
    private float _base = 299;

    public SofaDeepCleaning()
    {
        Id = "addon.sofa-deep-cleaning";
        Name = "Sofa Deep Cleaning";
    }

    public override bool TryCalculate(string value, out ServiceCalculationDescriptor? calculationDescriptor)
    {
        var parameters = Parse<SofaDeepCleaningParameters>(value);
        if (parameters == null)
        {
            calculationDescriptor = null;
            return false;
        }

        var calculation = _base * parameters.Seaters;

        calculationDescriptor = new ServiceCalculationDescriptor
        {
            Id = Id,
            Name = Name,
            CalculatedValue = calculation,
            Descriptors =
            [
                [ "Amount of Seaters", $"x{parameters.Seaters}" ]
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

            if (type != "float")
            {
                continue;
            }

            var float1 = float.TryParse(value, out var value1);
            if (!float1)
            {
                continue;
            }

            switch (key)
            {
                case "base":
                    _base = value1;
                    break;
                default:
                    continue;
            }
        }
    }

    public override ServiceExportObject ToExportObject()
    {
        return new ServiceExportObject
        {
            Id = Id,
            Name = Name,
            Description = Description,
            Editable = true,
            Type = ServiceType.Addons,
            Config = $"base:float:{_base}"
        };
    }

    public override List<ServiceFieldObject> GetSpecificFieldObjects()
    {
        return
        [
            new ServiceFieldObject
            {
                Id = "sdc-count",
                Label = "Number of Seaters",
                ConfigId = "seaters",
                Type = ServiceFieldType.InputNumeric,
                Restrictions = new Dictionary<string, string>
                {
                    { "min", "1" }
                }
            }
        ];
    }
}
