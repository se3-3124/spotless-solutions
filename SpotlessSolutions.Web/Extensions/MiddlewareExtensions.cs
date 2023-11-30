using Microsoft.Extensions.Caching.Distributed;
using SpotlessSolutions.Web.Contracts.V1.Responses;
using SpotlessSolutions.Web.Security.Policies.IpBlocking;

namespace SpotlessSolutions.Web.Extensions;

public static class MiddlewareExtensions
{
    public static void UseIpBlockingFilter(this WebApplication app)
    {
        app.Use(async (context, next) =>
        {
            var redis = app.Services.GetRequiredService<IDistributedCache>();
            var result = await redis.GetRecordAsync<IpRecordData>($"ip_rule_{context.Connection.RemoteIpAddress}");

            if (result != null)
            {
                if (result.Counter % 6 == 0 && result.LiftedAt > DateTime.Now)
                {
                    context.Response.StatusCode = 429;
                    await context.Response.WriteAsJsonAsync(new ManyRequestsException());
                    return;
                }
            }

            await next.Invoke();
        });
    }
}
