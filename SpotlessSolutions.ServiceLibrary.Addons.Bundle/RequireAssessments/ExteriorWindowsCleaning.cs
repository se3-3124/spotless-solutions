// ReSharper disable UnusedType.Global

using SpotlessSolutions.ServiceLibrary.Addons.Bundle.InternalTypes;
using SpotlessSolutions.ServiceLibrarySdk;
using SpotlessSolutions.ServiceLibrarySdk.ReturnTypes;

namespace SpotlessSolutions.ServiceLibrary.Addons.Bundle.RequireAssessments;

public class ExteriorWindowsCleaning : BaseAddon, IService
{
    public ExteriorWindowsCleaning()
    {
        Id = "addon.exterior-windows-cleaning";
        Name = "Exterior Windows Cleaning";
    }

    public override bool TryCalculate(string value, out ServiceCalculationDescriptor? calculationDescriptor)
    {
        var parameters = Parse<ExteriorWindowsCleaningParameters>(value);
        if (parameters == null)
        {
            calculationDescriptor = null;
            return false;
        }

        calculationDescriptor = new ServiceCalculationDescriptor
        {
            Id = Id,
            Name = Name,
            CalculatedValue = 0,
            Descriptors = [],
            SensitiveDescriptors =
            [
                [ "Photo Attached." ]
            ],
            RequiresAssessment = true
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
                Id = "ewc-photo",
                Label = "Photo of your Window",
                ConfigId = "internal_photo_address",
                Type = ServiceFieldType.FileUpload
            }
        ];
    }
}
