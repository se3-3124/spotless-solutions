namespace SpotlessSolutions.Worker.MessageContracts;

public class SendMailAddress
{
    public required string Name { get; init; }
    public required string Address { get; init; }
}
