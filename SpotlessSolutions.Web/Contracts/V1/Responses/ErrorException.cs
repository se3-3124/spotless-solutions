namespace SpotlessSolutions.Web.Contracts.V1.Responses;

public class ErrorException
{
    public bool Error { get; set; }
    public string[] Messages { get; set; }
}
