using FluentValidation;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SpotlessSolutions.Web.Contracts.V1.ResponseMappers;
using SpotlessSolutions.Web.Contracts.V1.Responses;
using SpotlessSolutions.Web.Data.Models;
using SpotlessSolutions.Web.Services.Services;
using ServiceConfig = SpotlessSolutions.Web.Contracts.V1.Requests.ServiceConfig;
using ServiceDetails = SpotlessSolutions.Web.Contracts.V1.Responses.ServiceDetails;

namespace SpotlessSolutions.Web.Controllers.V1;

[Route("/api/v1/services")]
public class ServiceController : ControllerBase
{
    private readonly IServiceRegistry _registry;
    private readonly IServiceManager _manager;
    private readonly IValidator<ServiceConfig> _serviceConfigValidator;

    public ServiceController(IServiceRegistry registry, IServiceManager manager,
        IValidator<ServiceConfig> serviceConfigValidator)
    {
        _registry = registry;
        _manager = manager;
        _serviceConfigValidator = serviceConfigValidator;
    }

    [HttpGet("all")]
    [ProducesResponseType(typeof(ServiceListResponse), 200)]
    public IActionResult GetAllServices()
    {
        var services = _registry.GetAllRegisteredServices();
        var addons = _registry.GetAllAddons();

        var data = services.Select(x => new ServiceDetails
        {
            Id = x.Id,
            Description = x.Description,
            Name = x.Name,
            Type = ServiceObjectType.Main
        }).ToList();
        data.AddRange(addons.Select(addon => new ServiceDetails
        {
            Type = ServiceObjectType.Addon,
            Id = addon.Id,
            Name = addon.Name,
            Description = addon.Description
        }));

        return Ok(new ServiceListResponse
        {
            Success = true,
            Data = data
        });
    }

    [HttpGet("view-details/service")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [ProducesResponseType(typeof(ErrorException), 401)]
    [ProducesResponseType(typeof(ErrorException), 404)]
    [ProducesResponseType(typeof(ServiceDataResponse), 200)]
    public IActionResult GetServiceDetail([FromQuery] string id)
    {
        // Check for role
        var userRole = HttpContext.User.Claims.Single(x => x.Type == "user_role")
            .Value;
        if (userRole != UserRoles.Administrator.ToString())
        {
            return Unauthorized(new ErrorException
            {
                Error = true,
                Messages = ["Not allowed"]
            });
        }

        var services = _registry.GetActivatedServiceInstance(id);
        if (services == null)
        {
            return NotFound(new ErrorException
            {
                Error = true,
                Messages = ["Specified service ID cannot be found"]
            });
        }

        return Ok(new ServiceDataResponse
        {
            Success = true,
            Result = services.ToExportObject().ToServiceData()
        });
    }
    
    [HttpGet("view-details/addon")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [ProducesResponseType(typeof(ErrorException), 401)]
    [ProducesResponseType(typeof(ErrorException), 404)]
    [ProducesResponseType(typeof(ServiceDataResponse), 200)]
    public IActionResult GetAddonDetail([FromQuery] string id)
    {
        // Check for role
        var userRole = HttpContext.User.Claims.Single(x => x.Type == "user_role")
            .Value;
        if (userRole != UserRoles.Administrator.ToString())
        {
            return Unauthorized(new ErrorException
            {
                Error = true,
                Messages = ["Not allowed"]
            });
        }

        var addon = _registry.GetActivatedAddonInstance(id);
        if (addon == null)
        {
            return NotFound(new ErrorException
            {
                Error = true,
                Messages = ["Specified addon ID cannot be found"]
            });
        }

        return Ok(new ServiceDataResponse
        {
            Success = true,
            Result = addon.ToExportObject().ToServiceData()
        });
    }

    [HttpPatch("edit")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [ProducesResponseType(typeof(ErrorException), 400)]
    [ProducesResponseType(typeof(ErrorException), 401)]
    [ProducesResponseType(typeof(GenericOkResult), 200)]
    public async Task<IActionResult> UpdateServiceDetails([FromBody] ServiceConfig config)
    {
        // Check for role
        var userRole = HttpContext.User.Claims.Single(x => x.Type == "user_role")
            .Value;
        if (userRole != UserRoles.Administrator.ToString())
        {
            return Unauthorized(new ErrorException
            {
                Error = true,
                Messages = ["Not allowed"]
            });
        }
        
        var validation = await _serviceConfigValidator.ValidateAsync(config);
        if (!validation.IsValid)
        {
            var messages = validation.Errors
                .Select(x => x.ErrorMessage)
                .ToArray();
            return BadRequest(new ErrorException
            {
                Error = true,
                Messages = messages,
            });
        }

        var updateConfig = new Services.Services.ServiceConfig
        {
            TargetingServiceId = config.TargetingServiceId,
            Config = config.Config,
            Description = config.Description,
            Name = config.Name
        };

        bool result;
        if (config.Type == ServiceObjectType.Addon)
        {
            result = await _manager.UpdateAddonConfiguration(updateConfig);
        }
        else
        {
            result = await _manager.UpdateServiceConfiguration(updateConfig);
        }
        
        if (!result)
        {
            return BadRequest(new ErrorException
            {
                Error = true,
                Messages = ["Updating of service failed. Maybe you are editing a unconfigurable service."]
            });
        }

        return Ok(new GenericOkResult
        {
            Success = true
        });
    }
}
