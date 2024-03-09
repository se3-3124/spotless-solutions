using System.Globalization;

namespace SpotlessSolutions.Web.Services.Services.Builtin;

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

    public override ServiceCalculationDescriptor Calculate(float[] values)
    {
        float calculated;
        if (values[0] <= _min)
        {
            calculated = _base;
        }
        else
        {
            calculated = _base + (values[0] * _next);
        }

        return new ServiceCalculationDescriptor
        {
            CalculatedValue = calculated,
            Descriptors =
            [
                [ "Area size", $"{values[0].ToString(CultureInfo.InvariantCulture)} sq. meters" ]
            ]
        };
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
