namespace SpotlessSolutions.Web.Services.Services.Builtin;

public class GeneralCleaning : ServiceTransportable, IService
{
    private readonly string _id = "service.main.general-cleaning";
    private string _name = "General Cleaning";
    private string _description = "";

    private float _base = 399;
    private float _perHourTick = 289;
    private float _cleaners = 150;
    
    public override float Calculate(float[] value)
    {
        if (value.Length < 2)
        {
            throw new ArgumentException("Invalid arguments");
        }
        
        var hours = value[0];
        var cleaners = value[1];

        return _base + (hours > 2 ? (hours - 1 * _perHourTick) : 0) + (cleaners > 2 ? (cleaners * _cleaners) : 0);
    }

    public override string GetId()
    {
        return _id;
    }

    public override string GetDescription()
    {
        return _description;
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

    public override string GetName()
    {
        return _name;
    }
}
