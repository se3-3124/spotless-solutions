using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SpotlessSolutions.Web.Contracts.V1.Responses;
using SpotlessSolutions.Web.Services.Services;

namespace SpotlessSolutions.Web.Controllers.V1;

[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
[Route("/api/v1/bookings")]
public class BookingController : ControllerBase
{
    private readonly IMapper _mapper;
    private readonly IServiceRegistry _registry;

    public BookingController(IMapper mapper, IServiceRegistry registry)
    {
        _mapper = mapper;
        _registry = registry;
    }

    [HttpGet("fields")]
    [ProducesResponseType(typeof(ErrorException), 400)]
    public IActionResult GetFormsFromServiceId([FromQuery] string serviceId)
    {
        if (string.IsNullOrEmpty(serviceId))
        {
            return BadRequest(new ErrorException
            {
                Error = true,
                Messages = ["Invalid service id provided."]
            });
        }

        var service = _registry.GetActivatedServiceInstance(serviceId);
        if (service == null)
        {
            return BadRequest(new ErrorException
            {
                Error = true,
                Messages = ["No service found."]
            });
        }

        var fields = service.GetSpecificFieldObjects()
            .Select(_mapper.Map<ServiceFieldItem>);

        return Ok(new ServiceFieldResponse
        {
            Success = true,
            Result = fields
        });
    }
}
