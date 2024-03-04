// ReSharper disable AutoPropertyCanBeMadeGetOnly.Global
// ReSharper disable UnusedAutoPropertyAccessor.Global

namespace SpotlessSolutions.Worker.MailRailgun;

public class ApplicationConfiguration
{
    /// <summary>
    /// Name of the sender or owner of the SMTP account
    /// </summary>
    public string Name { get; init; } = string.Empty;
    
    /// <summary>
    /// Email Address of the sender or owner of the SMTP account
    /// </summary>
    public string Address { get; init; } = string.Empty;
    
    /// <summary>
    /// Hostname of the SMTP server
    /// </summary>
    public string Hostname { get; init; } = string.Empty;
    
    /// <summary>
    /// Username of the account to use to authenticate to SMTP server
    /// </summary>
    public string Username { get; init; } = string.Empty;
    
    /// <summary>
    /// Password of the account to use to authenticate to SMTP server
    /// </summary>
    public string Password { get; init; } = string.Empty;
    
    /// <summary>
    /// Port of the SMTP server
    /// </summary>
    public int Port { get; init; }
}
