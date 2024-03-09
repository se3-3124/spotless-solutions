namespace SpotlessSolutions.Web.Services.Services.Addons;

public class Dishwashing : RequireAssessmentAddOn
{
    public Dishwashing()
    {
        Id = "addon.dishwashing";
        Name = "Dishwashing";
    }

    public override void UpdateConfig(string name, string description, string serviceConfig)
    {
        Name = name;
        Description = description;
    }

    public override List<ServiceFieldObject> GetSpecificFieldObjects()
    {
        return [];
    }
}
