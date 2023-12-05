using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SpotlessSolutions.Web.Contracts.V1.Responses;

namespace SpotlessSolutions.Web.Controllers.V1;

public class TestController : ControllerBase
{
    [Authorize]
    [HttpGet("/api/check")]
    public IActionResult Check()
    {
        return Ok(new GenericOkResult
        {
            Success = true
        });
    }
}
