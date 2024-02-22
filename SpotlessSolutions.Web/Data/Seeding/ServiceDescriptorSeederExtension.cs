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
                Id = Guid.Parse("bb54b6e6-f974-402b-a2ca-065b113d05dd"),
                Name = "Deep Cleaning",
                PricingFlags =
                [
                    ServiceDescriptorPricingFlags.IncludeTransportFee
                ]
            },
            new()
            {
                Id = Guid.Parse("32dca1cc-093d-4be8-ac1b-c4281e45dfeb"),
                Name = "General Cleaning",
                PricingFlags =
                [
                    ServiceDescriptorPricingFlags.IncludeTransportFee
                ]
            },
            new()
            {
                Id = Guid.Parse("db2654b7-6b3d-4fd4-ae35-38d615ca5ca3"),
                Name = "Post-Construction Cleaning",
                PricingFlags =
                [
                    ServiceDescriptorPricingFlags.IncludeTransportFee
                ]
            },
            new()
            {
                Id = Guid.Parse("c4f69875-b204-4326-9b67-204b5288f2f9"),
                Name = "Routine Cleaning",
                PricingFlags =
                [
                    ServiceDescriptorPricingFlags.IncludeTransportFee
                ]
            },
            new()
            {
                Name = "Add-Ons Only",
                PricingFlags =
                [
                    ServiceDescriptorPricingFlags.IncludeTransportFee
                ]
            }
        };

        var pricingRules = new List<ServiceDescriptorPricingRule>
        {
            new()
            {
                Type = ServiceDescriptorPricingRuleType.FixedNotExceeding,
                PricingConfig = "35,949",
                ServiceDescriptorId = services[0].Id
            },
            new()
            {
                Type = ServiceDescriptorPricingRuleType.Incremental,
                PricingConfig = "36,977,1,28",
                ServiceDescriptorId = services[0].Id
            },
            new()
            {
                Type = ServiceDescriptorPricingRuleType.Incremental,
                PricingConfig = "1,399,1,289",
                ServiceDescriptorId = services[1].Id
            },
            new()
            {
                Type = ServiceDescriptorPricingRuleType.FixedNotExceeding,
                PricingConfig = "35,1500",
                ServiceDescriptorId = services[2].Id
            },
            new()
            {
                Type = ServiceDescriptorPricingRuleType.Incremental,
                PricingConfig = "36,1530,1,30",
                ServiceDescriptorId = services[2].Id
            },
            new()
            {
                Type = ServiceDescriptorPricingRuleType.FixedNotExceeding,
                PricingConfig = "35,preset:0",
                ServiceDescriptorId = services[3].Id
            },
            new()
            {
                Type = ServiceDescriptorPricingRuleType.Incremental,
                PricingConfig = "36,preset:0,1,preset:1",
                ServiceDescriptorId = services[3].Id
            }
        };

        var presets = new List<ServiceDescriptorPricingPreset>
        {
            new()
            {
                Name = "Weekly",
                ConfigOverrides = "550,25",
                ServiceDescriptorId = services[3].Id
            },
            new()
            {
                Name = "Bi-Monthly",
                ConfigOverrides = "650,25",
                ServiceDescriptorId = services[3].Id
            },
            new()
            {
                Name = "Monthly",
                ConfigOverrides = "800,25",
                ServiceDescriptorId = services[3].Id
            }
        };

        #endregion

        #region AddOns

        var addOns = new List<AddOnServiceDescriptor>
        {
            new()
            {
                Id = Guid.Parse("cd68e881-5f44-4fe9-9b6a-1cb7a2bdbf14"),
                Name = "Mattress Deep Cleaning",
                AllowStandalone = true
            },
            new()
            {
                Id = Guid.Parse("e2ddbd4c-adc7-448a-9a95-20945fbd4787"),
                Name = "Sofa Deep Cleaning",
                AllowStandalone = true
            },
            new()
            {
                Name = "Carpet Deep Cleaning",
                AllowStandalone = true,
                AssessmentOnly = true
            },
            new()
            {
                Name = "Lawn Trimming",
                AllowStandalone = true,
                AssessmentOnly = true
            },
            new()
            {
                Id = Guid.Parse("af8e3088-b72c-410e-b2b1-b71b6f9801de"),
                Name = "Aircon Cleaning",
                AllowStandalone = true
            },
            new()
            {
                Id = Guid.Parse("37d705d3-6696-4aa2-b02b-1f718f6f9faa"),
                Name = "Car Interior Cleaning",
                AllowStandalone = true
            },
            new()
            {
                Name = "Dishwashing",
                AssessmentOnly = true
            },
            new()
            {
                Name = "Cabinet Cleaning and Organization",
                AssessmentOnly = true
            },
            new()
            {
                Name = "Garage Cleaning",
                AssessmentOnly = true
            },
            new()
            {
                Name = "Exterior Windows Cleaning",
                AssessmentOnly = true
            },
            new()
            {
                Name = "Refrigerator/Microwave Cleaning",
                AssessmentOnly = true
            }
        };

        var fields = new List<AddOnServiceFieldObject>
        {
            new()
            {
                Type = AddOnServiceFieldType.Select,
                GroupId = "g_bed_size_select",
                Name = "Single",
                Parameters = "30,1200",
                FieldType = AddOnServiceFieldParameterType.Rule,
                AddOnServiceDescriptorId = addOns[0].Id
            },
            new()
            {
                Type = AddOnServiceFieldType.Select,
                GroupId = "g_bed_size_select",
                Name = "Semi-Double",
                Parameters = "48,1500",
                FieldType = AddOnServiceFieldParameterType.Rule,
                AddOnServiceDescriptorId = addOns[0].Id
            },
            new()
            {
                Type = AddOnServiceFieldType.Select,
                GroupId = "g_bed_size_select",
                Name = "Double",
                Parameters = "54,2000",
                FieldType = AddOnServiceFieldParameterType.Rule,
                AddOnServiceDescriptorId = addOns[0].Id
            },
            new()
            {
                Type = AddOnServiceFieldType.Select,
                GroupId = "g_bed_size_select",
                Name = "Queen",
                Parameters = "60,2000",
                FieldType = AddOnServiceFieldParameterType.Rule,
                AddOnServiceDescriptorId = addOns[0].Id
            },
            new()
            {
                Type = AddOnServiceFieldType.Select,
                GroupId = "g_bed_size_select",
                Name = "King Size",
                Parameters = "72,2500",
                FieldType = AddOnServiceFieldParameterType.Rule,
                AddOnServiceDescriptorId = addOns[0].Id
            },
            new()
            {
                Type = AddOnServiceFieldType.InputNumberToReference,
                GroupId = "g_bed_size_count",
                Name = "Count",
                FieldType = AddOnServiceFieldParameterType.Value,
                ParameterValueFor = "g_bed_size_select",
                AddOnServiceDescriptorId = addOns[0].Id
            },
            new()
            {
                Type = AddOnServiceFieldType.InputNumber,
                GroupId = "g_sofa_count",
                Name = "Count",
                Parameters = "1,299",
                FieldType = AddOnServiceFieldParameterType.Value,
                AddOnServiceDescriptorId = addOns[1].Id
            },
            new()
            {
                FieldType = AddOnServiceFieldParameterType.Rule,
                Type = AddOnServiceFieldType.Select,
                GroupId = "g_aircon_size",
                Name = "0.75 and below",
                Parameters = "599,-1,-1",
                AddOnServiceDescriptorId = addOns[4].Id
            },
            new()
            {
                FieldType = AddOnServiceFieldParameterType.Rule,
                Type = AddOnServiceFieldType.Select,
                GroupId = "g_aircon_size",
                Name = "1.0hp",
                Parameters = "699,999,1299",
                AddOnServiceDescriptorId = addOns[4].Id
            },
            new()
            {
                FieldType = AddOnServiceFieldParameterType.Rule,
                Type = AddOnServiceFieldType.Select,
                GroupId = "g_aircon_size",
                Name = "1.5hp",
                Parameters = "799,1199,1499",
                AddOnServiceDescriptorId = addOns[4].Id
            },
            new()
            {
                FieldType = AddOnServiceFieldParameterType.Rule,
                Type = AddOnServiceFieldType.Select,
                GroupId = "g_aircon_size",
                Name = "2.0hp",
                Parameters = "899,1399,1699",
                AddOnServiceDescriptorId = addOns[4].Id
            },
            new()
            {
                FieldType = AddOnServiceFieldParameterType.Rule,
                Type = AddOnServiceFieldType.Select,
                GroupId = "g_aircon_size",
                Name = "2.5hp",
                Parameters = "999,1599,1899",
                AddOnServiceDescriptorId = addOns[4].Id
            },
            new()
            {
                FieldType = AddOnServiceFieldParameterType.Rule,
                Type = AddOnServiceFieldType.Select,
                GroupId = "g_aircon_type",
                Name = "Window Type",
                Parameters = "0",
                AddOnServiceDescriptorId = addOns[4].Id
            },
            new()
            {
                FieldType = AddOnServiceFieldParameterType.Rule,
                Type = AddOnServiceFieldType.Select,
                GroupId = "g_aircon_type",
                Name = "Split Type (Blower Only)",
                Parameters = "1",
                AddOnServiceDescriptorId = addOns[4].Id
            },
            new()
            {
                FieldType = AddOnServiceFieldParameterType.Rule,
                Type = AddOnServiceFieldType.Select,
                GroupId = "g_aircon_type",
                Name = "Split Type (Full Cleaning)",
                Parameters = "2",
                AddOnServiceDescriptorId = addOns[4].Id
            },
            new()
            {
                FieldType = AddOnServiceFieldParameterType.Value,
                Type = AddOnServiceFieldType.InputNumberToReference,
                GroupId = "g_aircon_count",
                Name = "Count",
                ParameterValueFor = "g_aircon_size,g_aircon_type",
                AddOnServiceDescriptorId = addOns[4].Id
            },
            new()
            {
                FieldType = AddOnServiceFieldParameterType.Rule,
                Type = AddOnServiceFieldType.Select,
                GroupId = "g_car_type",
                Name = "Hatchback/Compact",
                Parameters = "250,2500",
                AddOnServiceDescriptorId = addOns[5].Id
            },
            new()
            {
                FieldType = AddOnServiceFieldParameterType.Rule,
                Type = AddOnServiceFieldType.Select,
                GroupId = "g_car_type",
                Name = "Sedan",
                Parameters = "250,2500",
                AddOnServiceDescriptorId = addOns[5].Id
            },
            new()
            {
                FieldType = AddOnServiceFieldParameterType.Rule,
                Type = AddOnServiceFieldType.Select,
                GroupId = "g_car_type",
                Name = "MPV",
                Parameters = "250,3000",
                AddOnServiceDescriptorId = addOns[5].Id
            },
            new()
            {
                FieldType = AddOnServiceFieldParameterType.Rule,
                Type = AddOnServiceFieldType.Select,
                GroupId = "g_car_type",
                Name = "SUV",
                Parameters = "400,3500",
                AddOnServiceDescriptorId = addOns[5].Id
            },
            new()
            {
                FieldType = AddOnServiceFieldParameterType.Rule,
                Type = AddOnServiceFieldType.Select,
                GroupId = "g_car_type",
                Name = "Pick-up",
                Parameters = "400,3500",
                AddOnServiceDescriptorId = addOns[5].Id
            },
            new()
            {
                FieldType = AddOnServiceFieldParameterType.Rule,
                Type = AddOnServiceFieldType.Select,
                GroupId = "g_car_type",
                Name = "Van",
                Parameters = "500,4000",
                AddOnServiceDescriptorId = addOns[5].Id
            },
            new()
            {
                FieldType = AddOnServiceFieldParameterType.Rule,
                Type = AddOnServiceFieldType.Select,
                GroupId = "g_car_wash_type",
                Name = "Car wash with Shampoo",
                Parameters = "0",
                AddOnServiceDescriptorId = addOns[5].Id
            },
            new()
            {
                FieldType = AddOnServiceFieldParameterType.Rule,
                Type = AddOnServiceFieldType.Select,
                GroupId = "g_car_wash_type",
                Name = "Interior Deep Cleaning",
                Parameters = "1",
                AddOnServiceDescriptorId = addOns[5].Id
            }
        };

        var restrictions = new List<AddOnServiceRestrictionRule>()
        {
            new()
            {
                FieldId = "g_sofa_count",
                On = ServiceBookedType.AddOn,
                Parameters = "[0]<GT_EQ>:4",
                Message = "On Add-On, minimum of 4 is allowed.",
                AddOnServiceDescriptorId = addOns[1].Id
            }
        };

        #endregion

        if (!await context.ServiceDescriptors.AnyAsync())
        {
            await context.ServiceDescriptors.AddRangeAsync(services);
        }

        if (!await context.ServiceDescriptorPricingRules.AnyAsync())
        {
            await context.ServiceDescriptorPricingRules.AddRangeAsync(pricingRules);
        }

        if (!await context.ServiceDescriptorPricingPresets.AnyAsync())
        {
            await context.ServiceDescriptorPricingPresets.AddRangeAsync(presets);
        }

        if (!await context.AddOns.AnyAsync())
        {
            await context.AddOns.AddRangeAsync(addOns);
        }

        if (!await context.AddOnFields.AnyAsync())
        {
            await context.AddOnFields.AddRangeAsync(fields);
        }

        if (!await context.AddOnServiceRestrictionRules.AnyAsync())
        {
            await context.AddOnServiceRestrictionRules.AddRangeAsync(restrictions);
        }
    }
}
