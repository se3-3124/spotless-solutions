using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using SpotlessSolutions.Worker.MailRailgun;
using Wolverine;
using Wolverine.RabbitMQ;

var builder = Host.CreateDefaultBuilder(args);

var configuration = new ConfigurationBuilder()
    .AddJsonFile("appsettings.json")
    .AddEnvironmentVariables()
    .AddUserSecrets<Program>()
    .Build();

var applicationSettings = new ApplicationConfiguration();
configuration.Bind("Mailer", applicationSettings);

builder.ConfigureServices(x =>
{
    x.AddSingleton(applicationSettings);
});

builder.UseWolverine(opts =>
{
    opts.ListenToRabbitQueue("mail-queue").UseForReplies();
    opts.UseRabbitMq(c =>
    {
        c.HostName = "localhost";
    }).AutoProvision();
});

var app = builder.Build();

await app.RunAsync();
