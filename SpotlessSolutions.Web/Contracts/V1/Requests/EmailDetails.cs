// ReSharper disable UnusedAutoPropertyAccessor.Global

namespace SpotlessSolutions.Web.Contracts.V1.Requests;

public class EmailDetails
{
    public required Guid UserId { get; init; }
    public required string Subject { get; init; }
    public required string Body { get; init; }
}
