namespace SpotlessSolutions.Web.Services.Accounts;

public interface IUserAddressManagement
{
    /// <summary>
    /// Get the list of all addresses by the user owned
    /// </summary>
    /// <param name="userId"></param>
    /// <returns></returns>
    Task<List<AddressDetails>> GetAddressesByUser(Guid userId);
    
    /// <summary>
    /// Gets the specific address by the user
    /// </summary>
    /// <param name="userId"></param>
    /// <param name="addressId"></param>
    /// <returns></returns>
    Task<AddressDetails?> GetAddressByUser(Guid userId, Guid addressId);

    /// <summary>
    /// Creates a new address for the user
    /// </summary>
    /// <param name="userId"></param>
    /// <param name="addressData"></param>
    /// <returns></returns>
    Task<bool> SetNewAddress(Guid userId, CreateAddressDetails addressData);

    /// <summary>
    /// Modify the specific address
    /// </summary>
    /// <param name="userId"></param>
    /// <param name="addressId"></param>
    /// <param name="addressData"></param>
    /// <returns></returns>
    Task<bool> ModifyAddress(Guid userId, Guid addressId, UpdateAddressDetails addressData);
}