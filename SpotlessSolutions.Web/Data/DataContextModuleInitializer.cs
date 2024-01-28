using System.Runtime.CompilerServices;

namespace SpotlessSolutions.Web.Data;

public static class DataContextModuleInitializer
{
    [ModuleInitializer]
    public static void Initialize()
    {
        AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
    }
}