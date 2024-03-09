namespace SpotlessSolutions.Web.Services.Services.Addons;

public class RefrigeratorCleaningOrMicrowaveCleaning : RequireAssessmentAddOn
{
    public RefrigeratorCleaningOrMicrowaveCleaning()
    {
        Id = "addon.refrigerator-cleaning-or-microwave-cleaning";
        Name = "Refrigerator or Microwave Cleaning";
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
                Id = "rom-count",
                Label = "Number of Refrigerators or Microwaves",
                Type = ServiceFieldType.InputNumeric,
                Restrictions = new Dictionary<string, string>
                {
                    { "min", "1" }
                }
            }
        ];
    }
}
