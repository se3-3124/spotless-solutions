namespace SpotlessSolutions.Web.Services.Services.Addons;

public abstract class AddOnStandalone : IService
{
    protected string Id = string.Empty;
    protected string Name = string.Empty;
    protected string Description = string.Empty;

    public string GetId()
    {
        return Id;
    }
    
    public abstract ServiceCalculationDescriptor Calculate(float[] values);

    public abstract void UpdateConfig(string name, string description, string serviceConfig);

    public abstract ServiceExportObject ToExportObject();

    public abstract List<ServiceFieldObject> GetSpecificFieldObjects();

    public string GetDescription()
    {
        return Description;
    }

    public string GetName()
    {
        return Name;
    }

    public ServiceType GetServiceType()
    {
        return ServiceType.Addons;
    }
}
