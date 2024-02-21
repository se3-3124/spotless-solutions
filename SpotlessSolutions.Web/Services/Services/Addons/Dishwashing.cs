namespace SpotlessSolutions.Web.Services.Services.Addons;

public class Dishwashing : RequireAssessmentAddOn
{
    public Dishwashing()
    {
        Id = "addon.dishwashing";
        Name = "Dishwashing";
    }

    public override void UpdateConfiguration(string name, string description, string serviceConfig)
    {
        Name = name;
        Description = description;
    }
}
