using Microsoft.AspNetCore.Identity;
using SpotlessSolutions.Web.Data;

namespace SpotlessSolutions.Web.Services.Authentication;

public class Authentication : IAuthentication
{
    private readonly UserManager<IdentityUser> _user;
    private readonly DataContext _context;

    public Authentication(UserManager<IdentityUser> user, DataContext context)
    {
        _user = user;
        _context = context;
    }
    
    public Task<SessionToken?> Login(string email, string password)
    {
        throw new NotImplementedException();
    }

    public Task<bool> Register(UserRegistrationData data)
    {
        throw new NotImplementedException();
    }

    public Task<bool> RequestForPasswordReset(Guid userId)
    {
        throw new NotImplementedException();
    }

    public Task<bool> ValidatePasswordResetToken(string token)
    {
        throw new NotImplementedException();
    }

    public Task<bool> ResetPassword(string token, string newPassword)
    {
        throw new NotImplementedException();
    }
}
