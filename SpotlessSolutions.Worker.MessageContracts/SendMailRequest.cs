namespace SpotlessSolutions.Worker.MessageContracts;

public class SendMailRequest
{
    public required SendMailAddress To { get; init; }
    public required string Subject { get; init; }
    public required string MessageBody { get; init; }
}
