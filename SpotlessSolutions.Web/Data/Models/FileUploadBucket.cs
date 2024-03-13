using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

#pragma warning disable CS8618

namespace SpotlessSolutions.Web.Data.Models;

public class FileUploadBucket
{
    [Required]
    public Guid Id { get; set; }
    
    public Guid BucketPath { get; set; }
    public long FileSize { get; set; }
    public DateTime TimeUploaded { get; init; }
    
    public Guid OwnerId { get; init; }
    
    [ForeignKey(nameof(OwnerId))]
    public UserData Owner { get; init; }
}
