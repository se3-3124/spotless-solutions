namespace SpotlessSolutions.Web.Services.Services.Builtin;

public abstract class ServiceTransportable : IService
{
    public bool RequireTransportFee()
    {
        return true;
    }

    public abstract float Calculate(float[] values);
    public abstract string GetId();
    public abstract void UpdateConfig(string name, string description, string config);
    public abstract string GetName();
    public abstract string GetDescription();
    public abstract ServiceExportObject ToExportObject();
}
