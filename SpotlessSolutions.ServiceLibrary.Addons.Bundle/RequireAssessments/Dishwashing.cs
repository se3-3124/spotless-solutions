// ReSharper disable UnusedType.Global

using SpotlessSolutions.ServiceLibrarySdk;
using SpotlessSolutions.ServiceLibrarySdk.ReturnTypes;

namespace SpotlessSolutions.ServiceLibrary.Addons.Bundle.RequireAssessments;

public class Dishwashing : BaseAddon, IService
{
    public Dishwashing()
    {
        Id = "addon.dishwashing";
        Name = "Dishwashing";
    }

    public override bool TryCalculate(string value, out ServiceCalculationDescriptor? calculationDescriptor)
    {
        calculationDescriptor = new ServiceCalculationDescriptor
        {
            CalculatedValue = 0,
            Descriptors =
            [
                [ "Requires In-person Assessment" ]
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
        return [];
    }
}
