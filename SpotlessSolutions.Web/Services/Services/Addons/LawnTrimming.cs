namespace SpotlessSolutions.Web.Services.Services.Addons;

public class LawnTrimming : RequireAssessmentAddOn
{
    public LawnTrimming()
    {
        Id = "addon.lawn-trimming";
        Name = "Lawn Trimming";
    }
    
    public override void UpdateConfiguration(string name, string description, string serviceConfig)
    {
        Name = name;
        Description = description;
    }
}
