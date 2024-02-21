namespace SpotlessSolutions.Web.Services.Services.Addons;

public abstract class AddOnStandalone : IAddon
{
    protected string Id = string.Empty;
    protected string Name = string.Empty;
    protected string Description = string.Empty;

    public string GetId()
    {
        return Id;
    }

    public bool IsStandalone()
    {
        return true;
    }
    
    public abstract float Calculate(float[] values);
    public abstract void UpdateConfiguration(string name, string description, string serviceConfig);

    public string GetDescription()
    {
        return Description;
    }

    public string GetName()
    {
        return Name;
    }
}
