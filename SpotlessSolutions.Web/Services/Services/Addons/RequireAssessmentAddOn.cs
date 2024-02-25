namespace SpotlessSolutions.Web.Services.Services.Addons;

public abstract class RequireAssessmentAddOn : IService
{
    protected string Id = string.Empty;
    protected string Name = string.Empty;
    protected string Description = string.Empty;
    
    public string GetId()
    {
        return Id;
    }

    public bool IsStandalone()
    {
        return false;
    }

    public string GetDescription()
    {
        return Description;
    }

    public string GetName()
    {
        return Name;
    }

    public float Calculate(float[] values)
    {
        return 0;
    }
    
    public abstract void UpdateConfig(string name, string description, string serviceConfig);

    public ServiceExportObject ToExportObject()
    {
        return new ServiceExportObject
        {
            Id = Id,
            Name = Name,
            Description = Description,
            Editable = false,
            Type = ServiceType.Addons
        };
    }

    public ServiceType GetServiceType()
    {
        return ServiceType.Addons;
    }
}
