namespace SpotlessSolutions.Web.Data.Models;

public class AddOnServiceFieldObject
{
    public required string GroupId { get; set; }
    public required AddOnServiceFieldType Type { get; set; }
    public required string Name { get; set; }
    public required AddOnServiceFieldParameterType FieldType { get; set; }
    public string? Parameters { get; set; }
    public string? ParameterValueFor { get; set; }
}
