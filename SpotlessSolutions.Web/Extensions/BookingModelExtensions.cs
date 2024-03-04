namespace SpotlessSolutions.Web.Extensions;

public static class BookingModelExtensions
{
    public static float[]? GetCalculationParams(this string config)
    {
        var configs = config.Split(",");

        var values = new List<float>();
        foreach (var item in configs)
        {
            var value = item.Split(":");
            var data = value[2];

            if (!float.TryParse(data, out var realValue))
            {
                return null;
            }
            
            values.Add(realValue);
        }

        return values.ToArray();
    }
}
