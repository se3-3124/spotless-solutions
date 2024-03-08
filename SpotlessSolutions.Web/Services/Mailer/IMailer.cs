namespace SpotlessSolutions.Web.Services.Mailer;

public interface IMailer
{
    /// <summary>
    /// Sends the Mail to target user.
    ///
    /// Behind the hood, this sends the message to the MailRailgun via
    /// MessageBus.
    /// </summary>
    /// <param name="settings"></param>
    /// <returns></returns>
    Task Send(MailSettings settings);
}
