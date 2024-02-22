using SpotlessSolutions.Web.Contracts.V1.Responses;
using SpotlessSolutions.Web.Services.Bookings;

namespace SpotlessSolutions.Web.Contracts.V1.ResponseMappers;

public static class BookingObjectToBookingDetailsMapper
{
    public static BookingDetails ToBookingDetails(this BookingObject data)
    {
        var result = new BookingDetails
        {
            Schedule = data.Schedule,
            Id = data.Id,
            TotalPrice = data.TotalPrice,
            Status = data.Status,
            User = new BookingDetails.BookingUser
            {
                FirstName = data.User.FirstName,
                LastName = data.User.LastName,
                Email = data.User.Email,
                Id = data.User.UserId
            },
            Address = new BookingDetails.BookingAddress
            {
                Barangay = data.Address.Barangay,
                City = data.Address.City,
                District = data.Address.District,
                PostalCode = data.Address.PostalCode,
                Province = data.Address.Province,
                Street = data.Address.Street
            },
            MainService = new BookingDetails.ServiceDetailConfig
            {
                Service = new ServiceDetails
                {
                    Type = ServiceObjectType.Main,
                    Id = data.MainService.Service.Id,
                    Name = data.MainService.Service.Name,
                    Description = data.MainService.Service.Description
                },
                Config = data.MainService.Configuration
            },
            Addons = data.AddOns
                .Select(x => new BookingDetails.ServiceDetailConfig
                {
                    Service = new ServiceDetails
                    {
                        Type = ServiceObjectType.Addon,
                        Id = x.Service.Id,
                        Name = x.Service.Name,
                        Description = x.Service.Description
                    },
                    Config = x.Configuration
                })
        };

        return result;
    }
}
