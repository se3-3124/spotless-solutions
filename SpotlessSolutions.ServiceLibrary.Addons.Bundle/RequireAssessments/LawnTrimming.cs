﻿// ReSharper disable UnusedType.Global

using SpotlessSolutions.ServiceLibrary.Addons.Bundle.InternalTypes;
using SpotlessSolutions.ServiceLibrarySdk;
using SpotlessSolutions.ServiceLibrarySdk.ReturnTypes;

namespace SpotlessSolutions.ServiceLibrary.Addons.Bundle.RequireAssessments;

public class LawnTrimming : BaseAddon, IService
{
    public LawnTrimming()
    {
        Id = "addon.lawn-trimming";
        Name = "Lawn Trimming";
    }

    public override bool TryCalculate(string value, out ServiceCalculationDescriptor? calculationDescriptor)
    {
        var parameters = Parse<LawnTrimmingParameters>(value);
        if (parameters == null)
        {
            calculationDescriptor = null;
            return false;
        }

        // Limit characters on comment to 800 characters only.
        if (parameters.JobComment.Length > 800)
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
                [ "Job Comment", parameters.JobComment ],
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
                Id = "lt-photo",
                Label = "Lawn Photo",
                Type = ServiceFieldType.FileUpload
            },
            new ServiceFieldObject
            {
                Id = "lt-comment-box",
                Label = "Specify work needs to be done",
                Type = ServiceFieldType.InputTextBox
            }
        ];
    }
}
