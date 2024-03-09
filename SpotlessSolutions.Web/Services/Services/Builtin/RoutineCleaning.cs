using System.Globalization;
using System.Text;

namespace SpotlessSolutions.Web.Services.Services.Builtin;

public class RoutineCleaning : BuiltinService, IService
{
    private float _weeklyBase = 550;
    private float _weeklyTick = 25;
    private float _biMonthlyBase = 650;
    private float _biMonthlyTick = 25;
    private float _monthlyBase = 800;
    private float _monthlyTick = 25;
    private float _min = 35;

    public RoutineCleaning()
    {
        Id = "service.main.routine-cleaning";
        Name = "Routine Cleaning";
        Description = "";
    }

    public override ServiceCalculationDescriptor Calculate(float[] values)
    {
        var type = ParseType(values[0]);
        var serviceType = ParseServiceType(values[1]);
        var value = values[2];

        var calculated = type switch
        {
            RoutineCleaningTypes.Weekly => GetPrice(_weeklyBase, _weeklyTick, value),
            RoutineCleaningTypes.BiMonthly => GetPrice(_biMonthlyBase, _biMonthlyTick, value),
            _ => GetPrice(_monthlyBase, _monthlyTick, value)
        };

        var descriptorName = type switch
        {
            RoutineCleaningTypes.Weekly => "Weekly Interval",
            RoutineCleaningTypes.BiMonthly => "Bi-Monthly Interval",
            _ => "Monthly Interval"
        };

        return new ServiceCalculationDescriptor
        {
            CalculatedValue = calculated,
            Descriptors =
            [
                [ descriptorName ],
                [ serviceType ],
                [ "Area Size", $"{value.ToString(CultureInfo.InvariantCulture)} sq. meters" ]
            ]
        };
    }

    private string ParseServiceType(float value)
    {
        return value switch
        {
            >= 1 and < 2 => "Deep cleaning",
            >= 2 and < 3 => "Post Construction Cleaning",
            _ => throw new ArgumentOutOfRangeException(nameof(value))
        };
    }

    private float GetPrice(float baseValue, float perTick, float value)
    {
        if (value <= _min)
        {
            return baseValue;
        }

        return baseValue + (value * perTick);
    }

    private static RoutineCleaningTypes ParseType(float value)
    {
        return value switch
        {
            >= 1 and < 2 => RoutineCleaningTypes.Weekly,
            >= 2 and < 3 => RoutineCleaningTypes.BiMonthly,
            >= 3 and < 4 => RoutineCleaningTypes.Monthly,
            _ => throw new ArgumentOutOfRangeException(nameof(value))
        };
    }

    public override ServiceExportObject ToExportObject()
    {
        var config = new StringBuilder();
        config.Append($"weekly_base:float:{_weeklyBase},");
        config.Append($"bi_monthly_base:float:{_biMonthlyBase},");
        config.Append($"monthly_base:float:{_monthlyBase},");
        config.Append($"weekly_tick:float:{_weeklyTick},");
        config.Append($"bi_monthly_tick:float:{_biMonthlyTick},");
        config.Append($"monthly_tick:float:{_monthlyTick},");
        config.Append($"min:float:{_min}");

        return new ServiceExportObject
        {
            Id = Id,
            Name = Name,
            Description = Description,
            Editable = true,
            Type = ServiceType.Main,
            Config = config.ToString()
        };
    }

    public override List<ServiceFieldObject> GetSpecificFieldObjects()
    {
        return
        [
            new ServiceFieldObject
            {
                Id = "rc-last-req-date",
                Label = "Last Cleaning Date",
                Type = ServiceFieldType.InputDate,
                Restrictions = new Dictionary<string, string>
                {
                    { "date-accepts", "<30d" }
                }
            },
            new ServiceFieldObject
            {
                Id = "rc-service-sel",
                Label = "Pick a Routine Service",
                Type = ServiceFieldType.Select,
                SupportedValues = [
                    [ "1", "Deep Cleaning" ],
                    [ "2", "Post Construction Cleaning" ]
                ]
            },
            new ServiceFieldObject
            {
                Id = "rc-service-interval",
                Label = "Interval",
                Type = ServiceFieldType.Select,
                SupportedValues = [
                    [ "1", "Weekly" ],
                    [ "2", "Bi-Monthly" ],
                    [ "3", "Monthly" ]
                ]
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
                    case "weekly_base":
                         _weeklyBase = floatValue;
                        break;
                    case "bi_monthly_base":
                        _biMonthlyBase = floatValue;
                        break;
                    case "monthly_base":
                        _monthlyBase = floatValue;
                        break;
                    case "weekly_tick":
                        _weeklyTick = floatValue;
                        break;
                    case "bi_monthly_tick":
                        _biMonthlyTick = floatValue;
                        break;
                    case "monthly_tick":
                        _monthlyTick = floatValue;
                        break;
                    case "min":
                        _min = floatValue;
                        break;
                    default:
                        continue;
                }
            }
        }
    }
}
