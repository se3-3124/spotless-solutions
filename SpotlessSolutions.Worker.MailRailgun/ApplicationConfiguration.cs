namespace SpotlessSolutions.Worker.MailRailgun;

public class ApplicationConfiguration
{
    /// <summary>
    /// Name of the sender or owner of the SMTP account
    /// </summary>
    public string Name { get; init; }
    
    /// <summary>
    /// Email Address of the sender or owner of the SMTP account
    /// </summary>
    public string Address { get; init; }
    
    /// <summary>
    /// Hostname of the SMTP server
    /// </summary>
    public string Hostname { get; init; }
    
    /// <summary>
    /// Username of the account to use to authenticate to SMTP server
    /// </summary>
    public string Username { get; init; }
    
    /// <summary>
    /// Password of the account to use to authenticate to SMTP server
    /// </summary>
    public string Password { get; init; }
    
    /// <summary>
    /// Port of the SMTP server
    /// </summary>
    public int Port { get; init; }
}
