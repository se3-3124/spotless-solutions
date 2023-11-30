using MailKit.Net.Smtp;
using MimeKit;
using MimeKit.Text;

namespace SpotlessSolutions.Web.Services.Mailer;

public class Mailer : IMailer
{
    private readonly MailerConfig _config;

    public Mailer(MailerConfig config)
    {
        _config = config;
    }
    
    public async Task Send(MailSettings settings)
    {
        var email = new MimeMessage();
        email.From.Add(new MailboxAddress(_config.Name, _config.Address));
        email.To.Add(new MailboxAddress(settings.Recipient.Name, settings.Recipient.Address));

        email.Subject = settings.Subject;
        email.Body = new TextPart(TextFormat.Html)
        {
            Text = settings.Body
        };

        using var client = new SmtpClient();

        await client.ConnectAsync(_config.Hostname, _config.Port);
        await client.AuthenticateAsync(_config.Username, _config.Password);
        await client.SendAsync(email);
        await client.DisconnectAsync(true);
    }
}
