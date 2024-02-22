namespace SpotlessSolutions.Web.Services.Services.Builtin;

public class DeepCleaning : ServiceTransportable, IService
{
    private const string Id = "service.main.deepcleaning";
    private string _name = "Deep Cleaning";
    private string _description = "";
    
    private float _minimumThreshold = 35;
    private float _defaultBasePrice = 949;
    private float _defaultIncrementPerExceedingValue = 28;

    public override float Calculate(float[] value)
    {
        if (value[0] < 0)
        {
            throw new ArgumentOutOfRangeException(nameof(value));
        }

        if (value[0] <= _minimumThreshold)
        {
            return _defaultBasePrice;
        }

        return _defaultBasePrice + (value[0] * _defaultIncrementPerExceedingValue);
    }

    public override string GetId()
    {
        return Id;
    }

    public override string GetDescription()
    {
        return _description;
    }

    public override ServiceExportObject ToExportObject()
    {
        var export = new ServiceExportObject
        {
            Id = Id,
            Name = _name,
            Description = _description,
            Editable = true,
            Type = ServiceType.Main,
            Config =
                $"base:float:{_defaultBasePrice},min:float:{_minimumThreshold},next:float:{_defaultIncrementPerExceedingValue}"
        };

        return export;
    }

    public override void UpdateConfig(string name, string description, string config)
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

    public override string GetName()
    {
        return _name;
    }
}
