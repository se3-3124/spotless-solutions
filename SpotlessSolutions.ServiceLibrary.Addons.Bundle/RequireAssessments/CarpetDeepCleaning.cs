// ReSharper disable UnusedType.Global

using SpotlessSolutions.ServiceLibrary.Addons.Bundle.InternalTypes;
using SpotlessSolutions.ServiceLibrarySdk;
using SpotlessSolutions.ServiceLibrarySdk.ReturnTypes;

namespace SpotlessSolutions.ServiceLibrary.Addons.Bundle.RequireAssessments;

public class CarpetDeepCleaning : BaseAddon, IService
{
    public CarpetDeepCleaning()
    {
        Id = "addon.carpet-deep-cleaning";
        Name = "Carpet Deep Cleaning";
    }

    public override bool TryCalculate(string value, out ServiceCalculationDescriptor? calculationDescriptor)
    {
        var parameters = Parse<CarpetDeepCleaningParameters>(value);
        if (parameters == null)
        {
            calculationDescriptor = null;
            return false;
        }

        if (parameters.Size <= 0)
        {
            calculationDescriptor = null;
            return false;
        }

        calculationDescriptor = new ServiceCalculationDescriptor
        {
            CalculatedValue = 0,
            Descriptors =
            [
                [ "Photo Attachment" ],
                [ "Size", $"{parameters.Size}" ]
            ]
        };

        return true;
    }

    public override void UpdateConfig(string name, string description, string serviceConfig)
    {
        Name = name;
        Description = description;
    }

    public override ServiceExportObject ToExportObject()
    {
        return new ServiceExportObject
        {
            Id = Id,
            Name = Name,
            Description = Description,
            Editable = false,
            Type = ServiceType.Addons
        };
    }

    public override List<ServiceFieldObject> GetSpecificFieldObjects()
    {
        return
        [
            new ServiceFieldObject
            {
                Id = "cr-dc-photo",
                Label = "Photo of the Carpet",
                Type = ServiceFieldType.FileUpload
            },
            new ServiceFieldObject
            {
                Id = "cr-dc-size",
                Label = "Size of the carpet",
                Type = ServiceFieldType.InputNumeric,
                Restrictions = new Dictionary<string, string>
                {
                    { "min", "1" }
                }
            }
        ];
    }
}
