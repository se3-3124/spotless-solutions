namespace SpotlessSolutions.Web.Services.Mailer;

public interface IMailer
{
    Task Send(MailSettings settings);
}