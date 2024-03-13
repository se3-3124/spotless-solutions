namespace SpotlessSolutions.DataBucketSdk;

public class StoreResult
{
    /// <summary>
    /// The unique identifier of the file in the bucket
    /// </summary>
    public required string BucketId { get; init; }
    
    /// <summary>
    /// The name of the bucket provider
    /// </summary>
    public required string ProviderId { get; init; }
}
