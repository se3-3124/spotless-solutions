namespace SpotlessSolutions.Web.Services.Services.Addons;

public abstract class RequireAssessmentAddOn : IAddon
{
    protected string Id = "";
    
    public string GetId()
    {
        return Id;
    }

    public float Calculate(float[] values)
    {
        return 0;
    }
}
