namespace SpotlessSolutions.Web.Services.Services.Builtin;

public abstract class ServiceTransportable : IService
{
    protected bool RequireServiceFee = true;

    public bool RequireTransportFee()
    {
        return RequireServiceFee;
    }

    public abstract float Calculate(float[] values);
    public abstract string GetId();
}
