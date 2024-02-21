using SpotlessSolutions.Web.Services.Authentication;
using SpotlessSolutions.Web.Services.Authentication.OAuth2;
using SpotlessSolutions.Web.Services.Authentication.OAuth2.Google;
using SpotlessSolutions.Web.Services.Authentication.Session;
using SpotlessSolutions.Web.Services.Bookings;
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
        
        // OAuth2 providers
        serviceCollection.AddKeyedSingleton<IOAuth2Provider, GoogleOAuth2Provider>("GoogleOAuth2Provider");

        serviceCollection.AddSingleton<IServiceRegistry, ServiceRegistry>();
        serviceCollection.AddScoped<IBookingManager, BookingManager>();
    }
}
