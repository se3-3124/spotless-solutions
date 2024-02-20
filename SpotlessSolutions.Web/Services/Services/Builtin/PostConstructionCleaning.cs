namespace SpotlessSolutions.Web.Services.Services.Builtin;

public class PostConstructionCleaning : ServiceTransportable, IService
{
    private const string Id = "service.main.post-construction-cleaning";
    private string _name = "Post Construction Cleaning";
    private string _description = "";

    private float _base = 1500;
    private float _min = 35;
    private float _next = 30;

    public override float Calculate(float[] values)
    {
        if (values[0] <= _min)
        {
            return _base;
        }

        return _base + (values[0] * _next);
    }

    public override string GetId()
    {
        return Id;
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

    public override string GetName()
    {
        return _name;
    }
}
