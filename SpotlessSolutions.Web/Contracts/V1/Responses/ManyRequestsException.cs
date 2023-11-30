namespace SpotlessSolutions.Web.Contracts.V1.Responses;

public class ManyRequestsException
{
    public bool Error { get; init; } = true;

    public string[] Message = new[]
    {
        "Too many requests. Please try again later."
    };
}
