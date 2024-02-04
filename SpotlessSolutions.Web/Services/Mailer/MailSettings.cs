namespace SpotlessSolutions.Web.Services.Mailer;

public class MailSettings
{
    public class UserData
    {
        public required string Name { get; init; }
        public required string Address { get; init; }
    }
    
    public required UserData Recipient { get; init; }
    public required string Subject { get; init; }
    public required string Body { get; init; }
}