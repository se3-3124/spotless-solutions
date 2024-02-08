using System.Globalization;
using Microsoft.EntityFrameworkCore;
using SpotlessSolutions.Web.Data.Models;

namespace SpotlessSolutions.Web.Data.Seeding;

public static class BogusBookingSeed
{
    public static async Task SeedBogusBookings(this DataContext context, ILogger logger)
    {
        if (await context.UserBookings.AnyAsync())
        {
            logger.LogInformation("Skipping bogus seeding. Existing data found.");
            return;
        }
        
        if (!await context.ServiceDescriptors.AnyAsync() && !await context.AddOns.AnyAsync())
        {
            logger.LogWarning("No services found. Skipping...");
            return;
        }
        
        var account = await context.UserData.FirstOrDefaultAsync();
        if (account == null)
        {
            logger.LogWarning("Seems like there's no user found. Skipping bogus seeding...");
            return;
        }

        var address = await context.Addresses.FirstOrDefaultAsync(x => x.UserDataId == account.Id);
        if (address == null)
        {
            logger.LogWarning("No addresses found on user, creating...");
            address = new Address
            {
                Street = "Bogus Street 1",
                District = "Bogus District 1",
                Barangay = "Bogus Barangay 1",
                City = "Bogus City",
                PostalCode = "5000",
                Province = "Bogus Province",
                UserDataId = account.Id
            };

            await context.Addresses.AddAsync(address);
        }

        var config = await context.UserHomeConfigDetails
            .FirstOrDefaultAsync(x => x.UserId == account.Id);
        if (config == null)
        {
            logger.LogWarning("No home configurations found on user, creating...");
            config = new UserHomeConfigDetail
            {
                HomeSize = 69
            };

            await context.UserHomeConfigDetails.AddAsync(config);
        }
        
        // Add-On config
        var hatchBackConfig = await context.AddOnFields
            .FirstAsync(x => x.Name == "Hatchback/Compact");
        var interiorCleaning = await context.AddOnFields
            .FirstAsync(x => x.Name == "Interior Deep Cleaning");

        for (var i = 0; i < 10; i++)
        {
            var booking = new UserBooking
            {
                IssuedAt = DateTime.UtcNow.AddDays(i + 1),
                Status = UserBookingStatus.Pending,
                AddressId = address.Id,
                UserId = account.Id,
                BucketPath = "/bucket/none",
                ConfigId = config.Id,
                TransportFee = 200,
                TransportFeeForAssessment = false
            };

            await context.UserBookings.AddAsync(booking);

            var service = new UserServiceBookDetail
            {
                BookingReferenceId = booking.Id,
                ServiceId = Guid.Parse("bb54b6e6-f974-402b-a2ca-065b113d05dd"),
                ServiceArguments = config.HomeSize.ToString(CultureInfo.InvariantCulture),
                TotalComputedFee = 1901
            };

            await context.UserServiceBookDetails.AddAsync(service);

            var addOn = new UserAddOnBookDetail
            {
                BookingReferenceId = booking.Id,
                ServiceId = Guid.Parse("37d705d3-6696-4aa2-b02b-1f718f6f9faa"),
                ServiceArguments = $"{hatchBackConfig.Id},{interiorCleaning.Id},2",
                TotalComputedFee = 5000
            };

            await context.UserAddOnBookDetails.AddAsync(addOn);
        }
    }
}
