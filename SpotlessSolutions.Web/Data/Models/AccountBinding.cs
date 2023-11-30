using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SpotlessSolutions.Web.Data.Models;

public class AccountBinding
{
    [Key]
    public Guid Id { get; set; }
    
    public AccountBindingType Type { get; set; }
    public string AccountId { get; set; }
    
    public Guid UserDataId { get; set; }
    
    [ForeignKey(nameof(UserDataId))]
    public UserData User { get; set; }
}
