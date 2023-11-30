using SpotlessSolutions.Web.Services.Authentication;
using SpotlessSolutions.Web.Services.Authentication.Session;
using SpotlessSolutions.Web.Services.Mailer;

namespace SpotlessSolutions.Web.Services;

public static class ServiceInstaller
{
    public static void InstallServices(this IServiceCollection serviceCollection)
    {
        serviceCollection.AddScoped<ISessionIssuer, SessionIssuer>();
        serviceCollection.AddSingleton<IMailer, Mailer.Mailer>();
        serviceCollection.AddScoped<IAuthentication, Authentication.Authentication>();
    }
}
