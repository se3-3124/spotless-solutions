namespace SpotlessSolutions.Web.Services.Services.Addons;

public class SofaDeepCleaning : AddOnStandalone, IAddon
{
    private float _restrictionValue = 4;
    private float _base = 299;
    
    public SofaDeepCleaning()
    {
        Id = "addon.sofa-deep-cleaning";
        Name = "Sofa Deep Cleaning";
    }

    public override float Calculate(float[] values)
    {
        var restriction = values[0] > 0;
        var count = values[1];

        if (restriction && count < _restrictionValue)
        {
            throw new ArgumentOutOfRangeException(nameof(values));
        }

        return _base * count;
    }
    
    public override void UpdateConfiguration(string name, string description, string serviceConfig)
    {
        Name = name;
        Description = description;
        
        var configs = serviceConfig.Split(",");
        foreach (var config in configs)
        {
            var configDetails = config.Split(":");
            var key = configDetails[0];
            var type = configDetails[1];
            var value = configDetails[2];

            if (type != "float")
            {
                continue;
            }

            var float1 = float.TryParse(value, out var value1);
            if (!float1)
            {
                continue;
            }
            
            switch (key)
            {
                case "restriction":
                    _restrictionValue = value1;
                    break;
                case "base":
                    _base = value1;
                    break;
                default:
                    continue;
            }
        }
    }

    public override ServiceExportObject ToExportObject()
    {
        return new ServiceExportObject
        {
            Id = Id,
            Name = Name,
            Description = Description,
            Editable = true,
            Type = ServiceType.Addons,
            Config = $"restriction:float:{_restrictionValue},base:float:{_base}"
        };
    }
}
