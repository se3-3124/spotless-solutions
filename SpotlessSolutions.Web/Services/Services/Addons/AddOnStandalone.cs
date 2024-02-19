namespace SpotlessSolutions.Web.Services.Services.Addons;

public abstract class AddOnStandalone : IAddon
{
    public abstract string GetId();
    
    public bool IsStandalone()
    {
        return true;
    }
    
    public abstract float Calculate(float[] values);

    public string GetDescription()
    {
        return "";
    }
}
