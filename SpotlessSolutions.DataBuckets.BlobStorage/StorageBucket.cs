using Azure.Storage.Blobs;
using Microsoft.Extensions.Logging;
using SpotlessSolutions.DataBucketSdk;

namespace SpotlessSolutions.DataBuckets.BlobStorage;

internal class StorageBucket : IDataBucket
{
    private readonly BlobServiceClient _client;
    private readonly ILogger<StorageBucket> _logger;
    
    public StorageBucket(ILogger<StorageBucket> logger)
    {
        var value = Environment.GetEnvironmentVariable("BlobStorage__ConnectionString");
        if (string.IsNullOrEmpty(value))
        {
            throw new Exception("No connection string for using blob storage data bucket!");
        }
        _client = new BlobServiceClient(value);
        _logger = logger;
    }

    public async Task<StoreResult?> StoreFileToBucket(Stream stream, string filename)
    {
        var id = Guid.NewGuid();
        try
        {
            var result = await _client.CreateBlobContainerAsync($"blob-{id}");
            if (result == null)
            {
                return null;
            }

            var fileExtension = Path.GetExtension(filename);

            var container = _client.GetBlobContainerClient($"blob-{id}");
            await container.UploadBlobAsync($"content{fileExtension}", stream);

            return new StoreResult
            {
                BucketId = id.ToString(),
                ProviderId = "blob-storage-bucket"
            };
        }
        catch (Exception e)
        {
            _logger.LogCritical("An error encountered during uploading of asset: {ex}", e);
            return null;
        }
    }

    public async Task<StoreResult?> StoreFileToBucket(string localFilePath)
    {
        if (!File.Exists(localFilePath))
        {
            return null;
        }

        await using var stream = File.OpenRead(localFilePath);
        return await StoreFileToBucket(stream, localFilePath);
    }

    public async Task<PullResult?> GetFileFromBucket(string id)
    {
        var canParse = Guid.TryParse(id, out var bucketId);
        if (!canParse)
        {
            return null;
        }

        try
        {
            var client = _client.GetBlobContainerClient($"blob-{bucketId}");
            
            var item = client.GetBlobs().FirstOrDefault();
            if (item == null)
            {
                return null;
            }

            var blobClient = client.GetBlobClient(item.Name);
            var location = GetTemporaryStoragePath();
            await blobClient.DownloadToAsync(location);

            var isParsed = MimeTypes.TryGetMimeType(item.Name, out var type);

            return new PullResult
            {
                TemporaryStoredPath = location,
                ContentType = !isParsed || string.IsNullOrEmpty(type) ? "application/x-binary" : type
            };
        }
        catch (Exception e)
        {
            _logger.LogError("An exception occured while getting file from bucket: {e}", e);
            return null;
        }
    }

    private static string GetTemporaryStoragePath()
    {
        return Path.Combine(Path.GetTempPath(), Path.GetTempFileName());
    }
}
