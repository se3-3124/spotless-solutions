namespace SpotlessSolutions.Web.Services.Mailer;

public class MailSettings
{
    public class UserData
    {
        public string Name { get; set; }
        public string Address { get; set; }
    }
    
    public UserData Recipient { get; set; }
    public string Subject { get; set; }
    public string Body { get; set; }
}