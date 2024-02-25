namespace SpotlessSolutions.Web.Services.Services.Addons;

public class GarageCleaning : RequireAssessmentAddOn
{
    public GarageCleaning()
    {
        Id = "addon.garage-cleaning";
        Name = "Garage Cleaning";
    }

    public override void UpdateConfig(string name, string description, string serviceConfig)
    {
        Name = name;
        Description = description;
    }
}
