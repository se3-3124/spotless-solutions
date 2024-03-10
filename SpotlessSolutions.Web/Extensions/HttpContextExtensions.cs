using SpotlessSolutions.Web.Data.Models;

namespace SpotlessSolutions.Web.Extensions;

public static class HttpContextExtensions
{
    public static bool IsAdministrator(this HttpContext context)
    {
        try
        {
            var userRole = context.User.Claims.SingleOrDefault(x => x.Type == "user_role");
            return userRole?.Value != UserRoles.Administrator.ToString();
        }
        catch
        {
            return false;
        }
    }
}
