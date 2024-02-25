namespace SpotlessSolutions.Web.Services.Services.Addons;

public class CabinetCleaningAndOrganization : RequireAssessmentAddOn
{
    public CabinetCleaningAndOrganization()
    {
        Id = "addon.cabinet-cleaning-and-organization";
        Name = "Cabinet Cleaning and Organization";
    }

    public override void UpdateConfig(string name, string description, string serviceConfig)
    {
        Name = name;
        Description = description;
    }
}
