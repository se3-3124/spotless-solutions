using System.Globalization;
using System.Text;
using SpotlessSolutions.ServiceLibrary.Main.Bundle.InternalTypes;
using SpotlessSolutions.ServiceLibrarySdk;
using SpotlessSolutions.ServiceLibrarySdk.ReturnTypes;

namespace SpotlessSolutions.ServiceLibrary.Main.Bundle;

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

    public override bool TryCalculate(string value, out ServiceCalculationDescriptor? calculationDescriptor)
    {
        var parameters = Parse<RoutineCleaningParameters>(value);
        if (parameters == null)
        {
            calculationDescriptor = null;
            return false;
        }

        if (parameters.Area < 1)
        {
            calculationDescriptor = null;
            return false;
        }

        var calculated = parameters.Type switch
        {
            RoutineCleaningTypes.Weekly => GetPrice(_weeklyBase, _weeklyTick, parameters.Area),
            RoutineCleaningTypes.BiMonthly => GetPrice(_biMonthlyBase, _biMonthlyTick, parameters.Area),
            _ => GetPrice(_monthlyBase, _monthlyTick, parameters.Area)
        };

        var descriptorName = parameters.Type switch
        {
            RoutineCleaningTypes.Weekly => "Weekly Interval",
            RoutineCleaningTypes.BiMonthly => "Bi-Monthly Interval",
            _ => "Monthly Interval"
        };

        var serviceType = parameters.ServiceType switch
        {
            RoutineServiceTypes.DeepCleaning => "Deep cleaning",
            _ => "Post Construction Cleaning"
        };

        calculationDescriptor = new ServiceCalculationDescriptor
        {
            CalculatedValue = calculated,
            Descriptors =
            [
                [ descriptorName ],
                [ serviceType ],
                [ "Area Size", $"{value.ToString(CultureInfo.InvariantCulture)} sq. meters" ]
            ]
        };

        return true;
    }

    private float GetPrice(float baseValue, float perTick, float value)
    {
        if (value <= _min)
        {
            return baseValue;
        }

        return baseValue + value * perTick;
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
