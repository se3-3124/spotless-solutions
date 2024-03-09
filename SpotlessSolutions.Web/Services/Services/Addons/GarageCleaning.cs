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

    public override List<ServiceFieldObject> GetSpecificFieldObjects()
    {
        return
        [
            new ServiceFieldObject
            {
                Id = "gcc-area",
                Label = "Garage Area Size (in sq. meters)",
                Type = ServiceFieldType.InputNumeric,
                Restrictions = new Dictionary<string, string>
                {
                    { "min", "1" }
                }
            }
        ];
    }
}
