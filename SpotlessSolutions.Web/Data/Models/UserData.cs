#pragma warning disable CS8618

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace SpotlessSolutions.Web.Data.Models;

public class UserData
{
    [Key]
    public Guid Id { get; set; }

    [Required]
    public required string FirstName { get; set; } = string.Empty;
    [Required]
    public required string LastName { get; set; } = string.Empty;
    [Required]
    public UserRoles Role { get; set; } = UserRoles.User;
    [Required]
    public required string PhoneNumber { get; set; } = string.Empty;
    
    public string? UserId { get; set; }
    
    [ForeignKey(nameof(UserId))]
    public IdentityUser? User { get; set; }
}
