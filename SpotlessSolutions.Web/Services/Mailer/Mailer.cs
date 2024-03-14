using SpotlessSolutions.Worker.MessageContracts;
using Wolverine;

namespace SpotlessSolutions.Web.Services.Mailer;

public class Mailer : IMailer
{
    private readonly IMessageBus _bus;

    public Mailer(IMessageBus bus)
    {
        _bus = bus;
    }

    public async Task Send(MailSettings settings)
    {
        await _bus.SendAsync(new SendMailRequest
        {
            To = new SendMailAddress
            {
                Name = settings.Recipient.Name,
                Address = settings.Recipient.Address
            },
            Subject = settings.Subject,
            MessageBody = settings.Body
        });
    }
}
