namespace SpotlessSolutions.Web.Services.Services.Addons;

public class SofaDeepCleaning : AddOnStandalone, IAddon
{
    public override float Calculate(float[] values)
    {
        var restriction = values[0] > 0;
        var count = values[1];

        if (restriction && count < 4)
        {
            throw new ArgumentOutOfRangeException(nameof(values));
        }

        return 299 * count;
    }

    public override string GetId()
    {
        return "addon.sofa-deep-cleaning";
    }
}
