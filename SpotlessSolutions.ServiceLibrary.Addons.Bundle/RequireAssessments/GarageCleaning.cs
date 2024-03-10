// ReSharper disable UnusedType.Global

using SpotlessSolutions.ServiceLibrary.Addons.Bundle.InternalTypes;
using SpotlessSolutions.ServiceLibrarySdk;
using SpotlessSolutions.ServiceLibrarySdk.ReturnTypes;

namespace SpotlessSolutions.ServiceLibrary.Addons.Bundle.RequireAssessments;

public class GarageCleaning : BaseAddon, IService
{
    public GarageCleaning()
    {
        Id = "addon.garage-cleaning";
        Name = "Garage Cleaning";
    }

    public override bool TryCalculate(string value, out ServiceCalculationDescriptor? calculationDescriptor)
    {
        var parameters = Parse<GarageCleaningParameters>(value);
        if (parameters == null)
        {
            calculationDescriptor = null;
            return false;
        }

        if (parameters.Area <= 0)
        {
            calculationDescriptor = null;
            return false;
        }

        calculationDescriptor = new ServiceCalculationDescriptor
        {
            CalculatedValue = 0,
            Descriptors =
            [
                [ "Requires Assessment" ],
                [ "Area Size", $"{parameters.Area} sq. meters" ]
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
                Id = "gcc-area",
                Label = "Garage Area Size (in sq. meters)",
                Type = ServiceFieldType.InputNumeric,
                Restrictions = new Dictionary<string, string>
                {
                    { "min", "1" }
                }
            }
        ];
    }
}
