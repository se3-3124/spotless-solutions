namespace SpotlessSolutions.Web.Services.Services.Builtin;

public class RoutineCleaning : ServiceTransportable, IService
{
    private const string Id = "service.main.routine-cleaning";

    public override float Calculate(float[] values)
    {
        var type = ParseType(values[0]);
        var value = values[1];

        return type switch
        {
            RoutineCleaningTypes.Weekly => GetPrice(550, 25, value),
            RoutineCleaningTypes.BiMonthly => GetPrice(650, 25, value),
            _ => GetPrice(800, 25, value)
        };
    }

    private static float GetPrice(float baseValue, float perTick, float value)
    {
        if (value <= 35)
        {
            return baseValue;
        }

        return baseValue + (value * perTick);
    }

    private static RoutineCleaningTypes ParseType(float value)
    {
        return value switch
        {
            >= 1 and < 2 => RoutineCleaningTypes.Weekly,
            >= 2 and < 3 => RoutineCleaningTypes.BiMonthly,
            >= 3 and < 4 => RoutineCleaningTypes.Monthly,
            _ => throw new ArgumentOutOfRangeException(nameof(value))
        };
    }

    public override string GetId()
    {
        return Id;
    }
}
