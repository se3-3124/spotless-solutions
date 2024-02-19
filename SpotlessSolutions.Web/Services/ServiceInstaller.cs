using SpotlessSolutions.Web.Services.Authentication;
using SpotlessSolutions.Web.Services.Authentication.OAuth2;
using SpotlessSolutions.Web.Services.Authentication.OAuth2.Google;
using SpotlessSolutions.Web.Services.Authentication.Session;
using SpotlessSolutions.Web.Services.Booking;
using SpotlessSolutions.Web.Services.Mailer;
using SpotlessSolutions.Web.Services.Services;

namespace SpotlessSolutions.Web.Services;

public static class ServiceInstaller
{
    public static void InstallServices(this IServiceCollection serviceCollection)
    {
        serviceCollection.AddScoped<ISessionIssuer, SessionIssuer>();
        serviceCollection.AddSingleton<IMailer, Mailer.Mailer>();
        serviceCollection.AddScoped<IAuthentication, Authentication.Authentication>();
        serviceCollection.AddKeyedSingleton<IOAuth2Provider, GoogleOAuth2Provider>("GoogleOAuth2Provider");

        serviceCollection.AddScoped<IBookingManager, BookingManager>();
        serviceCollection.AddSingleton<IServiceRegistry, ServiceRegistry>();
    }
}
