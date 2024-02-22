namespace SpotlessSolutions.Web.Contracts.V1.Responses;

public class ErrorException
{
    public bool Error { get; init; }
    public string[] Messages { get; init; } = [];
}
