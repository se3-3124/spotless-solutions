namespace SpotlessSolutions.Web.Services.Services.Addons;

public class ExteriorWindowsCleaning : RequireAssessmentAddOn
{
    public ExteriorWindowsCleaning()
    {
        Id = "addon.exterior-windows-cleaning";
        Name = "Exterior Windows Cleaning";
    }

    public override void UpdateConfiguration(string name, string description, string serviceConfig)
    {
        Name = name;
        Description = description;
    }
}
