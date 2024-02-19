namespace SpotlessSolutions.Web.Services.Services.Addons;

public class AirconCleaning : AddOnStandalone, IAddon
{
    public bool RequireTransportFee()
    {
        throw new NotImplementedException();
    }

    public override float Calculate(float[] values)
    {
        var size = values[0];
        var type = ParseType(values[1]);
        var count = values[2];

        var (window, splitBlower, splitFull) = GetBasePriceFromSize(size);
        return type switch
        {
            AirconTypes.Window => window * count,
            AirconTypes.SplitTypeBlower => splitBlower * count,
            AirconTypes.SplitTypeFull => splitFull * count,
            _ => throw new ArgumentOutOfRangeException(nameof(values))
        };
    }

    private static AirconTypes ParseType(float value)
    {
        return value switch
        {
            >= 1 and < 2 => AirconTypes.Window,
            >= 2 and < 3 => AirconTypes.SplitTypeBlower,
            >= 3 and < 4 => AirconTypes.SplitTypeFull,
            _ => throw new ArgumentOutOfRangeException(nameof(value))
        };
    }

    private static (float, float, float) GetBasePriceFromSize(float value)
    {
        return value switch
        {
            <= 0.75f => (599, 0, 0),
            >= 1.0f and < 1.5f => (699, 1199, 1499),
            >= 2.0f and < 2.5f => (899, 1399, 1699),
            >= 2.5f => (999, 1599, 1899),
            _ => throw new ArgumentOutOfRangeException(nameof(value))
        };
    }

    public override string GetId()
    {
        return "addon.aircon-cleaning";
    }
}