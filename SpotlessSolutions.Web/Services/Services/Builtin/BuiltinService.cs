namespace SpotlessSolutions.Web.Services.Services.Builtin;

public abstract class BuiltinService : IService
{
    protected string Id = string.Empty;
    protected string Name = string.Empty;
    protected string Description = string.Empty;

    public abstract ServiceCalculationDescriptor Calculate(float[] value);

    public string GetId()
    {
        return Id;
    }

    public string GetDescription()
    {
        return Description;
    }

    public abstract void UpdateConfig(string name, string description, string config);

    public string GetName()
    {
        return Name;
    }

    public abstract ServiceExportObject ToExportObject();

    public abstract List<ServiceFieldObject> GetSpecificFieldObjects();

    public ServiceType GetServiceType()
    {
        return ServiceType.Main;
    }
}
