using SpotlessSolutions.Web.Security.Tokens.Session;

namespace SpotlessSolutions.Web.Security.Tokens;

public static class SetupSessionIssuer
{
    public static void InstallDefaultSessionIssuer(this IServiceCollection serviceCollection)
    {
        serviceCollection.AddScoped<ISessionIssuer, SessionIssuer>();
    }
}
