namespace SpotlessSolutions.Web.Services.Services.Addons;

public abstract class AddOnStandalone : IAddon
{
    public abstract string GetId();
    public abstract float Calculate(float[] values);
}