namespace SpotlessSolutions.Web.Services.Services.Builtin;

public class DeepCleaning : ServiceTransportable, IService
{
    private const string Id = "service.main.deepcleaning";

    public override float Calculate(float[] value)
    {
        return value[0] switch
        {
            < 0 => throw new ArgumentException("Invalid value"),
            <= 35 => 949,
            _ => 949 + (value[0] * 28)
        };
    }

    public override string GetId()
    {
        return Id;
    }
}
