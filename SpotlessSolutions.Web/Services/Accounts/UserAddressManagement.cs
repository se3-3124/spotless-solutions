using Microsoft.EntityFrameworkCore;
using SpotlessSolutions.Web.Data;
using SpotlessSolutions.Web.Data.Models;

namespace SpotlessSolutions.Web.Services.Accounts;

public class UserAddressManagement : IUserAddressManagement
{
    private readonly DataContext _context;
    private readonly ILogger<UserAddressManagement> _logger;

    public UserAddressManagement(DataContext context, ILogger<UserAddressManagement> logger)
    {
        _context = context;
        _logger = logger;
    }
    
    public async Task<List<AddressDetails>> GetAddressesByUser(Guid userId)
    {
        var user = await _context.Addresses
            .Where(x => x.UserDataId.Equals(userId))
            .Select(x => new AddressDetails
            {
                Id = x.Id,
                Barangay = x.Barangay,
                City = x.City,
                District = x.District,
                PostalCode = x.PostalCode,
                Province = x.Province,
                Street = x.Street
            })
            .ToListAsync();
        return user;
    }

    public async Task<AddressDetails?> GetAddressByUser(Guid userId, Guid addressId)
    {
        var address = await _context.Addresses
            .FirstOrDefaultAsync(x => x.UserDataId.Equals(userId) && x.Id.Equals(addressId));
        if (address == null)
        {
            return null;
        }
        
        return new AddressDetails
        {
            Id = address.Id,
            Barangay = address.Barangay,
            City = address.City,
            District = address.District,
            PostalCode = address.PostalCode,
            Province = address.Province,
            Street = address.Street
        };
    }

    public async Task<bool> SetNewAddress(Guid userId, CreateAddressDetails addressData)
    {
        var user = await _context.UserData.FirstOrDefaultAsync(x => x.Id.Equals(userId));
        if (user == null)
        {
            _logger.LogWarning("Setting address failed due to user not found! ID: {id}", userId);
            return false;
        }

        try
        {
            await _context.Addresses.AddAsync(new Address
            {
                Barangay = addressData.Barangay,
                City = addressData.City,
                District = addressData.District,
                PostalCode = addressData.PostalCode,
                Province = addressData.Province,
                Street = addressData.Street,
                UserDataId = userId
            });

            var results = await _context.SaveChangesAsync();
            return results > 0;
        }
        catch
        {
            return false;
        }
    }

    public Task<bool> ModifyAddress(Guid userId, Guid addressId, UpdateAddressDetails addressData)
    {
        throw new NotImplementedException();
    }
}