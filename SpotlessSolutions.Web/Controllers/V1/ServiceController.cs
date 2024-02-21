using Microsoft.AspNetCore.Mvc;
using SpotlessSolutions.Web.Contracts.V1.Responses;
using SpotlessSolutions.Web.Services.Services;
using ServiceDetails = SpotlessSolutions.Web.Contracts.V1.Responses.ServiceDetails;

namespace SpotlessSolutions.Web.Controllers.V1;

[Route("/api/v1/services")]
public class ServiceController : ControllerBase
{
    private readonly IServiceRegistry _registry;

    public ServiceController(IServiceRegistry registry)
    {
        _registry = registry;
    }

    [HttpGet("all")]
    [ProducesResponseType(typeof(ServiceListResponse), 200)]
    public IActionResult GetAllServices()
    {
        var services = _registry.GetAllRegisteredServices();
        return Ok(new ServiceListResponse
        {
            Success = true,
            Data = services.Select(x => new ServiceDetails
            {
                Id = x.Id,
                Description = x.Description,
                Name = x.Name
            }).ToArray()
        });
    }

    [HttpGet("addons/all")]
    [ProducesResponseType(typeof(ServiceListResponse), 200)]
    public IActionResult GetAllAddons()
    {
        var addons = _registry.GetAllAddons();
        return Ok(new ServiceListResponse
        {
            Success = true,
            Data = addons.Select(x => new ServiceDetails
            {
                Id = x.Id,
                Description = x.Description,
                Name = x.Name
            }).ToArray()
        });
    }
}
