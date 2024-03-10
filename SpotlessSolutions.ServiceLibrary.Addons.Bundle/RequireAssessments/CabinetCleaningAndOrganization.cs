// ReSharper disable UnusedType.Global

using SpotlessSolutions.ServiceLibrary.Addons.Bundle.InternalTypes;
using SpotlessSolutions.ServiceLibrarySdk;
using SpotlessSolutions.ServiceLibrarySdk.ReturnTypes;

namespace SpotlessSolutions.ServiceLibrary.Addons.Bundle.RequireAssessments;

public class CabinetCleaningAndOrganization : BaseAddon, IService
{
    public CabinetCleaningAndOrganization()
    {
        Id = "addon.cabinet-cleaning-and-organization";
        Name = "Cabinet Cleaning and Organization";
    }

    public override bool TryCalculate(string value, out ServiceCalculationDescriptor? calculationDescriptor)
    {
        var parameters = Parse<CabinetCleaningAndOrganizationParameters>(value);
        if (parameters == null)
        {
            calculationDescriptor = null;
            return false;
        }

        if (parameters.Count <= 0)
        {
            calculationDescriptor = null;
            return false;
        }

        calculationDescriptor = new ServiceCalculationDescriptor
        {
            CalculatedValue = 0,
            Descriptors =
            [
                [ "Total Cabinets", $"x{parameters.Count}" ]
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
                Id = "cco-count",
                Label = "Number of Cabinets",
                Type = ServiceFieldType.InputNumeric,
                Restrictions = new Dictionary<string, string>
                {
                    { "min", "1" }
                }
            }
        ];
    }
}
