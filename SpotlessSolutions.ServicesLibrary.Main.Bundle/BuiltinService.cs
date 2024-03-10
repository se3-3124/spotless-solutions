using System.Text.Json;
using SpotlessSolutions.ServiceLibrarySdk;
using SpotlessSolutions.ServiceLibrarySdk.ReturnTypes;

namespace SpotlessSolutions.ServiceLibrary.Main.Bundle;

public abstract class BuiltinService : IService
{
    protected string Id = string.Empty;
    protected string Name = string.Empty;
    protected string Description = string.Empty;

    public abstract bool TryCalculate(string value, out ServiceCalculationDescriptor? calculationDescriptor);

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

    protected T? Parse<T>(string value)
    {
        try
        {
            var result = JsonSerializer.Deserialize<T>(value);
            return result;
        }
        catch
        {
            return default;
        }
    }
}
