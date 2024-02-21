using System.Security.Cryptography;
using Bogus;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using SpotlessSolutions.Web.Data.Models;
using SpotlessSolutions.Web.Services.Services;

namespace SpotlessSolutions.Web.Data.Seeding;

public static class BookingMockSeeding
{
    public static async Task PopulateScheduleWithMock(this DataContext context,
        UserManager<IdentityUser> userManager, IServiceRegistry registry)
    {
        if (await context.Bookings.AnyAsync())
        {
            return;
        }
        
        var faker = new Faker();

        var email = faker.Internet.Email();
        var identityUser = new IdentityUser
        {
            Email = email,
            EmailConfirmed = true,
            UserName = email
        };

        var creationResult = await userManager
            .CreateAsync(identityUser, UserAccountSeederExtension.GeneratePassword());
        if (!creationResult.Succeeded)
        {
            return;
        }

        var user = new UserData
        {
            FirstName = faker.Name.FirstName(),
            LastName = faker.Name.LastName(),
            PhoneNumber = faker.Phone.PhoneNumber(),
            Role = UserRoles.User,
            UserId = identityUser.Id
        };
        await context.UserData.AddAsync(user);

        var address = new Address
        {
            Barangay = faker.Address.StreetSuffix(),
            District = faker.Address.State(),
            City = faker.Address.City(),
            Province = faker.Address.County(),
            PostalCode = faker.Address.ZipCode(),
            Street = faker.Address.StreetAddress(),
            UserDataId = user.Id
        };
        await context.Addresses.AddAsync(address);

        for (var i = 0; i < 100; i++)
        {
            var value = Convert.ToSingle(RandomNumberGenerator.GetInt32(35, 99));
            
            var mainService = registry.GetActivatedServiceInstance("service.main.deepcleaning")!;
            var mainServiceConfig = "0:float:" + value;
            var mainServicePrice = mainService.Calculate([value]);

            var addon1 = registry.GetActivatedAddonInstance("addon.aircon-cleaning")!;
            const string addon1Config = "0:float:2.0,1:float:3,2:float:2";
            var addon1Price = addon1.Calculate([2.0f, 3, 2]);

            var booking = new Booking
            {
                Status = BookingStatus.Pending,
                AddressId = address.Id,
                UserId = user.Id,
                MainServiceId = "service.main.deepcleaning",
                MainServiceConfiguration = mainServiceConfig,
                Addons = new Dictionary<string, string>
                {
                    { "addon.aircon-cleaning", addon1Config }
                },
                FinalPrice = mainServicePrice + addon1Price,
                Schedule = DateTime.Now.AddDays(i)
                    .ToUniversalTime()
            };
            await context.Bookings.AddAsync(booking);
        }
    }
}
