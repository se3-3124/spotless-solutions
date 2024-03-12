// ReSharper disable UnusedType.Global

using System.Globalization;
using SpotlessSolutions.ServiceLibrary.Main.Bundle.InternalTypes;
using SpotlessSolutions.ServiceLibrarySdk;
using SpotlessSolutions.ServiceLibrarySdk.ReturnTypes;

namespace SpotlessSolutions.ServiceLibrary.Main.Bundle;

public class PostConstructionCleaning : BuiltinService, IService
{
    private float _base = 1500;
    private float _min = 35;
    private float _next = 30;

    public PostConstructionCleaning()
    {
        Id = "service.main.post-construction-cleaning";
        Name = "Post Construction Cleaning";
        Description = "";
    }

    public override bool TryCalculate(string value, out ServiceCalculationDescriptor? calculationDescriptor)
    {
        var parameters = Parse<PostConstructionCleaningParameters>(value);
        if (parameters == null)
        {
            calculationDescriptor = null;
            return false;
        }

        float calculated;
        if (parameters.Area <= _min)
        {
            calculated = _base;
        }
        else
        {
            calculated = _base + parameters.Area * _next;
        }

        calculationDescriptor = new ServiceCalculationDescriptor
        {
            Id = Id,
            Name = Name,
            CalculatedValue = calculated,
            Descriptors =
            [
                [ "Area size", $"{parameters.Area.ToString(CultureInfo.InvariantCulture)} sq. meters" ]
            ],
            SensitiveDescriptors = [],
            RequiresAssessment = false
        };

        return true;
    }

    public override ServiceExportObject ToExportObject()
    {
        return new ServiceExportObject
        {
            Id = Id,
            Name = Name,
            Description = Description,
            Type = ServiceType.Main,
            Editable = true,
            Config = $"base:float:{_base},min:float:{_min},next:float:{_next}"
        };
    }

    public override List<ServiceFieldObject> GetSpecificFieldObjects()
    {
        return [];
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
                        _base = floatValue;
                        break;
                    case "min":
                        _min = floatValue;
                        break;
                    case "next":
                        _next = floatValue;
                        break;
                    default:
                        continue;
                }
            }
        }
    }
}

