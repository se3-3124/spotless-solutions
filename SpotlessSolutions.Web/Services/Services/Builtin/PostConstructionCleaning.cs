namespace SpotlessSolutions.Web.Services.Services.Builtin;

public class PostConstructionCleaning : ServiceTransportable, IService
{
    private const string Id = "service.main.post-construction-cleaning";

    public override float Calculate(float[] values)
    {
        if (values[0] <= 35)
        {
            return 1500;
        }

        return 1500 + (values[0] * 30);
    }

    public override string GetId()
    {
        return Id;
    }
}
