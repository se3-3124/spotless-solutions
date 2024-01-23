using Microsoft.EntityFrameworkCore;
using SpotlessSolutions.Web.Data.Models;
using ServiceDescriptor = SpotlessSolutions.Web.Data.Models.ServiceDescriptor;

namespace SpotlessSolutions.Web.Data.Seeding;

public static class ServiceDescriptorSeederExtension
{
    public static async Task ApplyServiceDescriptorSeed(this DataContext context)
    {
        #region Main Services

        var services = new List<ServiceDescriptor>
        {
            new()
            {
                Name = "Deep Cleaning",
                Rules =
                [
                    new()
                    {
                        Type = ServiceDescriptorPricingRuleType.FixedNotExceeding,
                        PricingConfig = "35,949"
                    },
                    new()
                    {
                        Type = ServiceDescriptorPricingRuleType.Incremental,
                        PricingConfig = "36,977,1,28"
                    }
                ],
                PricingFlags =
                [
                    ServiceDescriptorPricingFlags.IncludeTransportFee
                ]
            },
            new()
            {
                Name = "General Cleaning",
                Rules =
                [
                    new()
                    {
                        Type = ServiceDescriptorPricingRuleType.Incremental,
                        PricingConfig = "1,399,1,289"
                    }
                ],
                PricingFlags =
                [
                    ServiceDescriptorPricingFlags.IncludeTransportFee
                ]
            },
            new()
            {
                Name = "Post-Construction Cleaning",
                Rules =
                [
                    new()
                    {
                        Type = ServiceDescriptorPricingRuleType.FixedNotExceeding,
                        PricingConfig = "35,1500"
                    },
                    new()
                    {
                        Type = ServiceDescriptorPricingRuleType.Incremental,
                        PricingConfig = "36,1530,1,30"
                    }
                ],
                PricingFlags =
                [
                    ServiceDescriptorPricingFlags.IncludeTransportFee
                ]
            },
            new()
            {
                Name = "Routine Cleaning",
                Presets =
                [
                    new()
                    {
                        Name = "Weekly",
                        ConfigOverrides = "550,25"
                    },
                    new()
                    {
                        Name = "Bi-Monthly",
                        ConfigOverrides = "650,25"
                    },
                    new()
                    {
                        Name = "Monthly",
                        ConfigOverrides = "800,25"
                    }
                ],
                Rules =
                [
                    new()
                    {
                        Type = ServiceDescriptorPricingRuleType.FixedNotExceeding,
                        PricingConfig = "35,preset:0"
                    },
                    new()
                    {
                        Type = ServiceDescriptorPricingRuleType.Incremental,
                        PricingConfig = "36,preset:0,1,preset:1"
                    }
                ],
                PricingFlags =
                [
                    ServiceDescriptorPricingFlags.IncludeTransportFee
                ]
            },
            new()
            {
                Name = "Add-Ons Only",
                Rules = [],
                PricingFlags =
                [
                    ServiceDescriptorPricingFlags.IncludeTransportFee
                ]
            }
        };

        #endregion

        #region AddOns

        var addOns = new List<AddOnServiceDescriptor>
        {
            new()
            {
                Name = "Mattress Deep Cleaning",
                AllowStandalone = true,
                Fields =
                [
                    new AddOnServiceFieldObject
                    {
                        Type = AddOnServiceFieldType.Select,
                        GroupId = "g_bed_size_select",
                        Name = "Single",
                        Parameters = "30,1200",
                        FieldType = AddOnServiceFieldParameterType.Rule
                    },
                    new AddOnServiceFieldObject
                    {
                        Type = AddOnServiceFieldType.Select,
                        GroupId = "g_bed_size_select",
                        Name = "Semi-Double",
                        Parameters = "48,1500",
                        FieldType = AddOnServiceFieldParameterType.Rule
                    },
                    new AddOnServiceFieldObject
                    {
                        Type = AddOnServiceFieldType.Select,
                        GroupId = "g_bed_size_select",
                        Name = "Double",
                        Parameters = "54,2000",
                        FieldType = AddOnServiceFieldParameterType.Rule
                    },
                    new AddOnServiceFieldObject
                    {
                        Type = AddOnServiceFieldType.Select,
                        GroupId = "g_bed_size_select",
                        Name = "Queen",
                        Parameters = "60,2000",
                        FieldType = AddOnServiceFieldParameterType.Rule
                    },
                    new AddOnServiceFieldObject
                    {
                        Type = AddOnServiceFieldType.Select,
                        GroupId = "g_bed_size_select",
                        Name = "King Size",
                        Parameters = "72,2500",
                        FieldType = AddOnServiceFieldParameterType.Rule
                    },
                    new AddOnServiceFieldObject
                    {
                        Type = AddOnServiceFieldType.InputNumberToReference,
                        GroupId = "g_bed_size_count",
                        Name = "Count",
                        FieldType = AddOnServiceFieldParameterType.Value,
                        ParameterValueFor = "g_bed_size_select"
                    }
                ]
            },
            new()
            {
                Name = "Sofa Deep Cleaning",
                AllowStandalone = true,
                Fields =
                [
                    new AddOnServiceFieldObject
                    {
                        Type = AddOnServiceFieldType.InputNumber,
                        GroupId = "g_sofa_count",
                        Name = "Count",
                        Parameters = "1,299",
                        FieldType = AddOnServiceFieldParameterType.Value
                    }
                ],
                Restrictions =
                [
                    new AddOnServiceRestrictionRule
                    {
                        FieldId = "g_sofa_count",
                        On = ServiceBookedType.AddOn,
                        Parameters = "[0]<GT_EQ>:4",
                        Message = "On Add-On, minimum of 4 is allowed."
                    }
                ]
            },
            new()
            {
                Name = "Carpet Deep Cleaning",
                AllowStandalone = true,
                AssessmentOnly = true,
                Fields = []
            },
            new()
            {
                Name = "Lawn Trimming",
                AllowStandalone = true,
                AssessmentOnly = true,
                Fields = []
            },
            new()
            {
                Name = "Aircon Cleaning",
                AllowStandalone = true,
                Fields =
                [
                    new AddOnServiceFieldObject
                    {
                        FieldType = AddOnServiceFieldParameterType.Rule,
                        Type = AddOnServiceFieldType.Select,
                        GroupId = "g_aircon_size",
                        Name = "0.75 and below",
                        Parameters = "599,-1,-1"
                    },
                    new AddOnServiceFieldObject
                    {
                        FieldType = AddOnServiceFieldParameterType.Rule,
                        Type = AddOnServiceFieldType.Select,
                        GroupId = "g_aircon_size",
                        Name = "1.0hp",
                        Parameters = "699,999,1299"
                    },
                    new AddOnServiceFieldObject
                    {
                        FieldType = AddOnServiceFieldParameterType.Rule,
                        Type = AddOnServiceFieldType.Select,
                        GroupId = "g_aircon_size",
                        Name = "1.5hp",
                        Parameters = "799,1199,1499"
                    },
                    new AddOnServiceFieldObject
                    {
                        FieldType = AddOnServiceFieldParameterType.Rule,
                        Type = AddOnServiceFieldType.Select,
                        GroupId = "g_aircon_size",
                        Name = "2.0hp",
                        Parameters = "899,1399,1699"
                    },
                    new AddOnServiceFieldObject
                    {
                        FieldType = AddOnServiceFieldParameterType.Rule,
                        Type = AddOnServiceFieldType.Select,
                        GroupId = "g_aircon_size",
                        Name = "2.5hp",
                        Parameters = "999,1599,1899"
                    },
                    new AddOnServiceFieldObject
                    {
                        FieldType = AddOnServiceFieldParameterType.Rule,
                        Type = AddOnServiceFieldType.Select,
                        GroupId = "g_aircon_type",
                        Name = "Window Type",
                        Parameters = "0"
                    },
                    new AddOnServiceFieldObject
                    {
                        FieldType = AddOnServiceFieldParameterType.Rule,
                        Type = AddOnServiceFieldType.Select,
                        GroupId = "g_aircon_type",
                        Name = "Split Type (Blower Only)",
                        Parameters = "1"
                    },
                    new AddOnServiceFieldObject
                    {
                        FieldType = AddOnServiceFieldParameterType.Rule,
                        Type = AddOnServiceFieldType.Select,
                        GroupId = "g_aircon_type",
                        Name = "Split Type (Full Cleaning)",
                        Parameters = "2"
                    },
                    new AddOnServiceFieldObject
                    {
                        FieldType = AddOnServiceFieldParameterType.Value,
                        Type = AddOnServiceFieldType.InputNumberToReference,
                        GroupId = "g_aircon_count",
                        Name = "Count",
                        ParameterValueFor = "g_aircon_size,g_aircon_type"
                    }
                ]
            },
            new()
            {
                Name = "Car Interior Cleaning",
                AllowStandalone = true,
                Fields =
                [
                    new AddOnServiceFieldObject
                    {
                        FieldType = AddOnServiceFieldParameterType.Rule,
                        Type = AddOnServiceFieldType.Select,
                        GroupId = "g_car_type",
                        Name = "Hatchback/Compact",
                        Parameters = "250,2500"
                    },
                    new AddOnServiceFieldObject
                    {
                        FieldType = AddOnServiceFieldParameterType.Rule,
                        Type = AddOnServiceFieldType.Select,
                        GroupId = "g_car_type",
                        Name = "Sedan",
                        Parameters = "250,2500"
                    },
                    new AddOnServiceFieldObject
                    {
                        FieldType = AddOnServiceFieldParameterType.Rule,
                        Type = AddOnServiceFieldType.Select,
                        GroupId = "g_car_type",
                        Name = "MPV",
                        Parameters = "250,3000"
                    },
                    new AddOnServiceFieldObject
                    {
                        FieldType = AddOnServiceFieldParameterType.Rule,
                        Type = AddOnServiceFieldType.Select,
                        GroupId = "g_car_type",
                        Name = "SUV",
                        Parameters = "400,3500"
                    },
                    new AddOnServiceFieldObject
                    {
                        FieldType = AddOnServiceFieldParameterType.Rule,
                        Type = AddOnServiceFieldType.Select,
                        GroupId = "g_car_type",
                        Name = "Pick-up",
                        Parameters = "400,3500"
                    },
                    new AddOnServiceFieldObject
                    {
                        FieldType = AddOnServiceFieldParameterType.Rule,
                        Type = AddOnServiceFieldType.Select,
                        GroupId = "g_car_type",
                        Name = "Van",
                        Parameters = "500,4000"
                    },
                    new AddOnServiceFieldObject
                    {
                        FieldType = AddOnServiceFieldParameterType.Rule,
                        Type = AddOnServiceFieldType.Select,
                        GroupId = "g_car_wash_type",
                        Name = "Car wash with Shampoo",
                        Parameters = "0"
                    },
                    new AddOnServiceFieldObject
                    {
                        FieldType = AddOnServiceFieldParameterType.Rule,
                        Type = AddOnServiceFieldType.Select,
                        GroupId = "g_car_wash_type",
                        Name = "Interior Deep Cleaning",
                        Parameters = "1"
                    }
                ]
            },
            new()
            {
                Name = "Dishwashing",
                AssessmentOnly = true,
                Fields = []
            },
            new()
            {
                Name = "Cabinet Cleaning and Organization",
                AssessmentOnly = true,
                Fields = []
            },
            new()
            {
                Name = "Garage Cleaning",
                AssessmentOnly = true,
                Fields = []
            },
            new()
            {
                Name = "Exterior Windows Cleaning",
                AssessmentOnly = true,
                Fields = []
            },
            new()
            {
                Name = "Refrigerator/Microwave Cleaning",
                AssessmentOnly = true,
                Fields = []
            }
        };

        #endregion

        if (!await context.ServiceDescriptors.AnyAsync())
        {
            await context.ServiceDescriptors.AddRangeAsync(services);
        }

        if (!await context.AddOns.AnyAsync())
        {
            await context.AddOns.AddRangeAsync(addOns);
        }
    }
}
