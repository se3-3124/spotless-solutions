using System.Text;

namespace SpotlessSolutions.Web.Services.Services.Builtin;

public class RoutineCleaning : IService
{
    private const string Id = "service.main.routine-cleaning";
    private string _name = "Routine Cleaning";
    private string _description = "";

    private float _weeklyBase = 550;
    private float _weeklyTick = 25;
    private float _biMonthlyBase = 650;
    private float _biMonthlyTick = 25;
    private float _monthlyBase = 800;
    private float _monthlyTick = 25;
    private float _min = 35;

    public float Calculate(float[] values)
    {
        var type = ParseType(values[0]);
        var value = values[1];

        return type switch
        {
            RoutineCleaningTypes.Weekly => GetPrice(_weeklyBase, _weeklyTick, value),
            RoutineCleaningTypes.BiMonthly => GetPrice(_biMonthlyBase, _biMonthlyTick, value),
            _ => GetPrice(_monthlyBase, _monthlyTick, value)
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

    public string GetId()
    {
        return Id;
    }

    public string GetDescription()
    {
        return _description;
    }

    public ServiceExportObject ToExportObject()
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
            Name = _name,
            Description = _description,
            Editable = true,
            Type = ServiceType.Main,
            Config = config.ToString()
        };
    }

    public void UpdateConfig(string name, string description, string config)
    {
        _name = name;
        _description = description;

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

    public string GetName()
    {
        return _name;
    }
    
    public ServiceType GetServiceType()
    {
        return ServiceType.Main;
    }
}
