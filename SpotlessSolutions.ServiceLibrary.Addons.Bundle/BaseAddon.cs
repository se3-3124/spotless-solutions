using System.Text.Json;
using SpotlessSolutions.ServiceLibrarySdk;
using SpotlessSolutions.ServiceLibrarySdk.ReturnTypes;

namespace SpotlessSolutions.ServiceLibrary.Addons.Bundle;

public abstract class BaseAddon : IService
{
    protected string Id = string.Empty;
    protected string Name = string.Empty;
    protected string Description = string.Empty;

    public string GetId()
    {
        return Id;
    }

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

    protected T? Parse<T>(string value)
    {
        try
        {
            var result = JsonSerializer.Deserialize<T>(value);
            return result;
        }
        catch
        {
            return default(T);
        }
    }

    public abstract bool TryCalculate(string value, out ServiceCalculationDescriptor? calculationDescriptor);

    public abstract void UpdateConfig(string name, string description, string serviceConfig);

    public abstract ServiceExportObject ToExportObject();

    public abstract List<ServiceFieldObject> GetSpecificFieldObjects();
}
