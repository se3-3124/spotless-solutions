namespace SpotlessSolutions.Web.Services.Services.Addons;

public abstract class RequireAssessmentAddOn : IAddon
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
        return false;
    }

    public string GetDescription()
    {
        return Description;
    }

    public string GetName()
    {
        return Name;
    }

    public float Calculate(float[] values)
    {
        return 0;
    }
    
    public abstract void UpdateConfiguration(string name, string description, string serviceConfig);
}
