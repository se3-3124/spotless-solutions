namespace SpotlessSolutions.DataBucketSdk;

public class PullResult
{
    public required string ContentType { get; init; }
    public required string TemporaryStoredPath { get; init; }
}
