namespace SpotlessSolutions.Web.Services.Services.Addons;

public class MattressDeepAddOn : AddOnStandalone, IAddon
{
    public override float Calculate(float[] values)
    {
        var size = ParseSize(values[0]);
        var count = values[1];

        if (count <= 1)
        {
            throw new ArgumentOutOfRangeException(nameof(values));
        }

        return size switch
        {
            MattressDeepSize.Single => 1200 * count,
            MattressDeepSize.SemiDouble => 1500 * count,
            MattressDeepSize.Double => 2000 * count,
            MattressDeepSize.Queen => 2000 * count,
            MattressDeepSize.KingSize => 2500 * count,
            _ => throw new ArgumentOutOfRangeException(nameof(values))
        };
    }

    private MattressDeepSize ParseSize(float value)
    {
        return value switch
        {
            >= 29 and < 31 => MattressDeepSize.Single,
            >= 47 and < 49 => MattressDeepSize.SemiDouble,
            >= 53 and < 55 => MattressDeepSize.Double,
            >= 59 and < 61 => MattressDeepSize.Queen,
            >= 71 and < 73 => MattressDeepSize.KingSize,
            _ => throw new ArgumentOutOfRangeException(nameof(value))
        };
    }

    public override string GetId()
    {
        return "addon.mattress-deep";
    }
}
