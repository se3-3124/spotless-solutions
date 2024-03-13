using Microsoft.Extensions.DependencyInjection;
using SpotlessSolutions.DataBucketSdk;

namespace SpotlessSolutions.DataBuckets.BlobStorage;

public static class InitializeBlobStorageBucket
{
    public static void InstallBlobStorageDataBucket(this IServiceCollection collection)
    {
        collection.AddSingleton<IDataBucket, StorageBucket>();
    }
}
