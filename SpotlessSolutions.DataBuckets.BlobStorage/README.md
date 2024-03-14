# SpotlessSolutions Azure Blob Storage Data Bucket

This houses the implementation of `IDataBucket` that supports Azure's
Blob Storage to store user provided images

## Developing

### Prerequisites

Please make sure you have the following software and SDKs installed in
your system:

- [.NET 8 SDK](https://dotnet.microsoft.com/en-us/download)
- [A active Azure Subscription and Storage Account](https://learn.microsoft.com/en-us/azure/storage/common/storage-account-overview)

### Downloading the source code

Clone the repository:

```
git clone https://github.com/se3-3124/spotless-solutions.git
cd spotless-solutions/SpotlessSolutions.DataBuckets.BlobStorage
```

### Resolving Project Dependencies

To resolve project dependencies, just run `dotnet restore`.

### Setting up your environment

Setup your Connection String in environment variable:

#### Windows:

```
setx BlobStorage__ConnectionString "<your connection string>"
```

#### Linux/macOS:

```
export BlobStorage__ConnectionString="<your connection string>"
```

### Usage

In your `Program.cs` of your ASP.NET Core project or your DI:

```csharp
builder.Services.InstallBlobStorageDataBucket();
```

And then you can use it on your projects:

```csharp
using SpotlessSolutions.DataBucketSdk;
using SpotlessSolutions.DataBuckets.BlobStorage;

public class YourService
{
    private readonly IDataBucket _bucket;
    
    public YourService(IDataBucket bucket)
    {
        _bucket = bucket;
    }
    
    public async Task UploadFile(string fileName)
    {
        var result = await _bucket.StoreFileToBucket(fileName);
        if (result == null)
        {
            Console.WriteLine("Unable to upload to bucket");
            return;
        }
        
        Console.WriteLine($"ID of File: {result.BucketId}");
        Console.WriteLine($"Name of provider (just in case if you have multiple buckets): {result.ProviderId}");
    }
}
```

## License

Spotless Solution's Source Code is licensed under [BSD 3-Clause License](https://spdx.org/licenses/BSD-3-Clause.html).
Please see the [LICENSE](../LICENSE) file for more information.
[Tl;dr](https://www.tldrlegal.com/license/bsd-3-clause-license-revised)
