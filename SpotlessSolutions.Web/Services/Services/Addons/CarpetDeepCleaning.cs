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

    public override List<ServiceFieldObject> GetSpecificFieldObjects()
    {
        return
        [
            new ServiceFieldObject
            {
                Id = "cr-dc-photo",
                Label = "Photo of the Carpet",
                Type = ServiceFieldType.FileUpload
            },
            new ServiceFieldObject
            {
                Id = "cr-dc-size",
                Label = "Size of the carpet",
                Type = ServiceFieldType.InputNumeric,
                Restrictions = new Dictionary<string, string>
                {
                    { "min", "1" }
                }
            }
        ];
    }
}
