namespace SpotlessSolutions.Web.Services.Mailer;

public static class SetupMailerConfig
{
    public static void InstallMailerSettings(this IServiceCollection serviceCollection, IConfiguration configuration)
    {
        var config = new MailerConfig();
        configuration.Bind(nameof(config), config);

        serviceCollection.AddSingleton(config);
    }
}