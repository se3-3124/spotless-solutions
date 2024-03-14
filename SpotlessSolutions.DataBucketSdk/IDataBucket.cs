namespace SpotlessSolutions.DataBucketSdk;

public interface IDataBucket
{
    /// <summary>
    /// Stores a Stream to a Data Bucket
    /// </summary>
    /// <param name="stream"></param>
    /// <param name="filename"></param>
    /// <returns>The ID of the data from the data bucket</returns>
    Task<StoreResult?> StoreFileToBucket(Stream stream, string filename);
    
    /// <summary>
    /// Stores a locally stored file to a Data Bucket
    /// </summary>
    /// <param name="localFilePath"></param>
    /// <returns></returns>
    Task<StoreResult?> StoreFileToBucket(string localFilePath);

    /// <summary>
    /// Fetch a file from the bucket
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    Task<PullResult?> GetFileFromBucket(string id);
}
