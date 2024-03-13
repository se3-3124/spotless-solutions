namespace SpotlessSolutions.Web.Contracts.V1.Responses;

public class FileUploadResult
{
    public bool Success { get; init; }
    public Guid AttachmentId { get; init; }
}