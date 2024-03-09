using System.Globalization;

namespace SpotlessSolutions.Web.Services.Services.Builtin;

public class GeneralCleaning : BuiltinService, IService
{
    private float _base = 399;
    private float _perHourTick = 289;
    private float _cleaners = 150;

    public GeneralCleaning()
    {
        Id = "service.main.general-cleaning";
        Name = "General Cleaning";
        Description = "";
    }
    
    public override ServiceCalculationDescriptor Calculate(float[] value)
    {
        if (value.Length < 2)
        {
            throw new ArgumentException("Invalid arguments");
        }
        
        var hours = value[0];
        var cleaners = value[1];

        var calculated = _base + (hours > 2 ? (hours - 1 * _perHourTick) : 0) + (cleaners > 2 ? (cleaners * _cleaners) : 0);

        return new ServiceCalculationDescriptor
        {
            CalculatedValue = calculated,
            Descriptors = 
            [
                [ "Hours specified", $"{hours.ToString(CultureInfo.InvariantCulture)} hours" ],
                [ "Cleaners", $"x{cleaners.ToString(CultureInfo.CurrentCulture)}" ]
            ]
        };
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
            Config = $"base:float:{_base},cleaners:float:{_cleaners},next:float:{_perHourTick}"
        };

        return export;
    }

    public override List<ServiceFieldObject> GetSpecificFieldObjects()
    {
        return
        [
            new ServiceFieldObject
            {
                Id = "gc-hours",
                Label = "Target Hours",
                Type = ServiceFieldType.InputNumeric,
                Restrictions = new Dictionary<string, string>
                {
                    { "min", "2" }
                }
            },

            new ServiceFieldObject
            {
                Id = "gc-cleaners-count",
                Label = "Amount of Cleaners",
                Type = ServiceFieldType.InputNumeric,
                Restrictions = new Dictionary<string, string>()
                {
                    { "min", "2" }
                }
            }
        ];
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
                    case "cleaners":
                        _cleaners = floatValue;
                        break;
                    case "next":
                        _perHourTick = floatValue;
                        break;
                    default:
                        continue;
                }
            }
        }
    }
}
