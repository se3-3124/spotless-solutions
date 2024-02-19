namespace SpotlessSolutions.Web.Services.Services.Builtin;

public class GeneralCleaning : ServiceTransportable, IService
{
    private readonly string _id = "service.main.general-cleaning";
    
    public override float Calculate(float[] value)
    {
        if (value.Length < 2)
        {
            throw new ArgumentException("Invalid arguments");
        }
        
        var hours = value[0];
        var cleaners = value[1];

        return 399 + (hours > 2 ? (hours - 1 * 289) : 0) + (cleaners > 2 ? (cleaners * 150) : 0);
    }

    public override string GetId()
    {
        return _id;
    }
}
