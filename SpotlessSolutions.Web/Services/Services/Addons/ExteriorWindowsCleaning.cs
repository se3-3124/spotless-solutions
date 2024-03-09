namespace SpotlessSolutions.Web.Services.Services.Addons;

public class ExteriorWindowsCleaning : RequireAssessmentAddOn
{
    public ExteriorWindowsCleaning()
    {
        Id = "addon.exterior-windows-cleaning";
        Name = "Exterior Windows Cleaning";
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
                Id = "ewc-photo",
                Label = "Photo of your Window",
                Type = ServiceFieldType.FileUpload
            }
        ];
    }
}
