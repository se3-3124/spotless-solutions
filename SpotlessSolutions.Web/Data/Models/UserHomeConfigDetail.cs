#pragma warning disable CS8618

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SpotlessSolutions.Web.Data.Models;

public class UserHomeConfigDetail
{
    [Key]
    public Guid Id { get; set; }
    
    public required double HomeSize { get; set; }
    public int BedroomCount { get; set; }
    public int ComfortRoomCount { get; set; }
    public int KitchenCount { get; set; }
    public int LivingRoomCount { get; set; }
    public int StorageCount { get; set; }
    public int FloorCount { get; set; }
    
    public Guid? UserId { get; set; }
    [ForeignKey(nameof(UserId))]
    public UserData? User { get; set; }
}
