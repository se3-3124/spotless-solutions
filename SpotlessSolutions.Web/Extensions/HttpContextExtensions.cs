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

    public static Guid GetCurrentSessionUserDataId(this HttpContext context)
    {
        try
        {
            var userId = context.User.Claims.SingleOrDefault(x => x.Type == "cid");
            if (userId?.Value == null)
            {
                return Guid.Empty;
            }

            var didParsed = Guid.TryParse(userId.Value, out var id);
            return !didParsed ? Guid.Empty : id;
        }
        catch
        {
            return Guid.Empty;
        }
    }
}
