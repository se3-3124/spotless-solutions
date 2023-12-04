namespace SpotlessSolutions.Web.Services.Authentication.OAuth2.Google;

public static class SetupGoogleClientConfig
{
    public static void InstallGoogleConfig(this IServiceCollection services, IConfiguration configuration)
    {
        var config = new GoogleClientConfig();
        configuration.Bind("ExternalAuthenticators:Google", config);

        services.AddSingleton(config);
    }
}
