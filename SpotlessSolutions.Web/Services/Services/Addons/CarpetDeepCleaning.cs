namespace SpotlessSolutions.Web.Services.Services.Addons;

public class CarpetDeepCleaning : RequireAssessmentAddOn
{
    public CarpetDeepCleaning()
    {
        Id = "addon.carpet-deep-cleaning";
        Name = "Carpet Deep Cleaning";
    }

    public override void UpdateConfig(string name, string description, string serviceConfig)
    {
        Name = name;
        Description = description;
    }
}
