namespace SpotlessSolutions.Web.Contracts.V1.Responses;

public class ManyRequestsException : ErrorException
{
    public ManyRequestsException()
    {
        Error = true;
        Messages =
        [
            "Too many requests. Please try again later."
        ];
    }
}
