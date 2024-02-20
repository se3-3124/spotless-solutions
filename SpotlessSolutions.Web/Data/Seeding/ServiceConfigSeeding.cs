using SpotlessSolutions.Web.Data.Models;

namespace SpotlessSolutions.Web.Data.Seeding;

public static class ServiceConfigSeeding
{
    public static async Task SeedServiceConfigurations(this DataContext context)
    {
        var configs = new List<ServiceConfig>
        {
            new()
            {
                TargetingServiceId = "service.main.deepcleaning",
                Name = "Deep Cleaning",
                Description = "Our flagship products for the deepest and long-lasting clean",
                ServiceConfiguration = "base:float:949,min:float:35,next:float:28"
            },
            new()
            {
                TargetingServiceId = "service.main.general-cleaning",
                Name = "General Cleaning",
                Description = "A quick clean that is best for small areas",
                ServiceConfiguration = "base:float:399,next:float:289,cleaners:float:150"
            },
            new()
            {
                TargetingServiceId = "service.main.post-construction-cleaning",
                Name = "Post Construction Cleaning",
                Description = "For newly constructed or renovated homes",
                ServiceConfiguration = "base:float:1500,next:float:30,min:float:35"
            },
            new()
            {
                TargetingServiceId = "service.main.routine-cleaning",
                Name = "Routine Cleaning",
                Description = "Follow-up cleaning to Deep or Post Construction Cleaning, Routine cleaning can be done weekly, bi-monthly or monthly and has a lower price",
                ServiceConfiguration = "weekly_base:float:550,bi_monthly_base:float:650,monthly_base:float:800,weekly_tick:float:25,bi_monthly_tick:float:25,monthly_tick:float:25,min:float:35"
            },
            new()
            {
                TargetingServiceId = "addon.aircon-cleaning",
                Name = "Aircon cleaning",
                Description = "",
                ServiceConfiguration = "0.75_w:float:599,0.75_stb:float:0,0.75_stf:float:0,1.0_w:float:699,1.0_stb:float:1199,1.0_stf:float:1499,2.0_w:float:899,2.0_stb:float:1399,2.0_stf:float:1699,2.5_w:float:999,2.5_stb:float:1599,2.5_stf:float:1899"
            },
            new()
            {
                TargetingServiceId = "addon.car-interior-deep-cleaning",
                Name = "Car Interior Cleaning",
                Description = "",
                ServiceConfiguration = "hatchback:(float|float):(250|2500),sedan:(float|float):(250|2500),mpv:(float|float):(250|3000),suv:(float|float):(400|3500),pickup:(float|float):(400|3500),van:(float|float):(500|4000)"
            },
            new()
            {
                TargetingServiceId = "addon.mattress-deep",
                Name = "Mattress Deep",
                Description = "",
                ServiceConfiguration = "single:float:1200,semidouble:float:1500,double:float:2000,queen:float:2000,kingsize:float:2500"
            },
            new()
            {
                TargetingServiceId = "addon.sofa-deep-cleaning",
                Name = "Sofa Deep Cleaning",
                Description = "",
                ServiceConfiguration = "base:float:299"
            }
        };

        await context.ServiceConfigs.AddRangeAsync(configs);
    }
}
