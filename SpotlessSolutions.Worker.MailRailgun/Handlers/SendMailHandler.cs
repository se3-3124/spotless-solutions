using MailKit.Net.Smtp;
using Microsoft.Extensions.Logging;
using MimeKit;
using MimeKit.Text;
using SpotlessSolutions.Worker.MessageContracts;

namespace SpotlessSolutions.Worker.MailRailgun.Handlers;

public class SendMailRequestHandler
{
    private readonly ILogger<SendMailRequestHandler> _logger;
    private readonly ApplicationConfiguration _config;

    public SendMailRequestHandler(ILogger<SendMailRequestHandler> logger, ApplicationConfiguration config)
    {
        _logger = logger;
        _config = config;
    }

    public async Task Handle(SendMailRequest request)
    {
        _logger.LogInformation("Mail queue send to: {name} with {address}", request.To.Name, request.To.Address);
        using var client = new SmtpClient();
        await client.ConnectAsync(_config.Hostname, _config.Port);
        await client.AuthenticateAsync(_config.Username, _config.Password);
        
        // Compose message
        var email = new MimeMessage();
        
        email.From.Add(new MailboxAddress(_config.Name, _config.Address));
        email.To.Add(new MailboxAddress(request.To.Name, request.To.Address));

        email.Subject = request.Subject;
        email.Body = new TextPart(TextFormat.Html)
        {
            Text = request.MessageBody
        };

        await client.SendAsync(email);
        
        // Close the connection
        await client.DisconnectAsync(true);
    }
}
