namespace SpotlessSolutions.Web.Data.Models;

public class AddOnServiceRestrictionRule
{
    public required ServiceBookedType On { get; set; }
    public required string FieldId { get; set; }
    public required string Parameters { get; set; }
    public required string Message { get; set; }
}