// ReSharper disable UnusedType.Global

using SpotlessSolutions.ServiceLibrary.Main.Bundle.InternalTypes;
using SpotlessSolutions.ServiceLibrarySdk;
using SpotlessSolutions.ServiceLibrarySdk.ReturnTypes;

namespace SpotlessSolutions.ServiceLibrary.Main.Bundle;

public class DeepCleaning : BuiltinService, IService
{
    private float _minimumThreshold = 35;
    private float _defaultBasePrice = 949;
    private float _defaultIncrementPerExceedingValue = 28;

    public DeepCleaning()
    {
        Id = "service.main.deepcleaning";
        Name = "Deep Cleaning";
        Description = "";
    }

    public override bool TryCalculate(string value, out ServiceCalculationDescriptor? calculationDescriptor)
    {
        var parameters = Parse<DeepCleaningParameters>(value);
        if (parameters == null)
        {
            calculationDescriptor = null;
            return false;
        }

        if (parameters.Area < 0)
        {
            calculationDescriptor = null;
            return false;
        }

        float calculatedPrice;
        if (value[0] <= _minimumThreshold)
        {
            calculatedPrice = _defaultBasePrice;
        }
        else
        {
            calculatedPrice = _defaultBasePrice + parameters.Area * _defaultIncrementPerExceedingValue;
        }

        calculationDescriptor = new ServiceCalculationDescriptor
        {
            Id = Id,
            Name = Name,
            CalculatedValue = calculatedPrice,
            Descriptors =
            [
                [
                    "Area Size", $"{parameters.Area} sq. meters"
                ]
            ],
            SensitiveDescriptors = [],
            RequiresAssessment = false
        };

        return true;
    }

    public override ServiceExportObject ToExportObject()
    {
        var export = new ServiceExportObject
        {
            Id = Id,
            Name = Name,
            Description = Description,
            Editable = true,
            Type = ServiceType.Main,
            Config =
                $"base:float:{_defaultBasePrice},min:float:{_minimumThreshold},next:float:{_defaultIncrementPerExceedingValue}"
        };

        return export;
    }

    public override void UpdateConfig(string name, string description, string config)
    {
        Name = name;
        Description = description;

        var overrides = config.Split(",");
        foreach (var configOverride in overrides)
        {
            var configData = configOverride.Split(":");

            var target = configData[0];
            var type = configData[1];
            var value = configData[2];

            if (type == "float")
            {
                var float1 = float.TryParse(value, out var floatValue);
                if (!float1)
                {
                    continue;
                }

                switch (target)
                {
                    case "base":
                        _defaultBasePrice = floatValue;
                        break;
                    case "min":
                        _minimumThreshold = floatValue;
                        break;
                    case "next":
                        _defaultIncrementPerExceedingValue = floatValue;
                        break;
                    default:
                        continue;
                }
            }
        }
    }

    public override List<ServiceFieldObject> GetSpecificFieldObjects()
    {
        return [];
    }
}
