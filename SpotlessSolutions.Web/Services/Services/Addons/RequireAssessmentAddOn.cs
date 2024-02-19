namespace SpotlessSolutions.Web.Services.Services.Addons;

public abstract class RequireAssessmentAddOn : IAddon
{
    protected string Id = "";
    
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
        return "";
    }

    public float Calculate(float[] values)
    {
        return 0;
    }
}
