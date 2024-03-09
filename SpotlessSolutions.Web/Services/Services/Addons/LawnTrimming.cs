namespace SpotlessSolutions.Web.Services.Services.Addons;

public class LawnTrimming : RequireAssessmentAddOn
{
    public LawnTrimming()
    {
        Id = "addon.lawn-trimming";
        Name = "Lawn Trimming";
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
                Id = "lt-photo",
                Label = "Lawn Photo",
                Type = ServiceFieldType.FileUpload
            },
            new ServiceFieldObject
            {
                Id = "lt-comment-box",
                Label = "Specify work needs to be done",
                Type = ServiceFieldType.InputTextBox
            }
        ];
    }
}
