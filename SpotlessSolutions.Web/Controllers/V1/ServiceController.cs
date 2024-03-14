using AutoMapper;
using FluentValidation;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SpotlessSolutions.ServiceLibrarySdk.ReturnTypes;
using SpotlessSolutions.Web.Contracts.V1.Requests;
using SpotlessSolutions.Web.Contracts.V1.Responses;
using SpotlessSolutions.Web.Extensions;
using SpotlessSolutions.Web.Services.Services;

namespace SpotlessSolutions.Web.Controllers.V1;

[Route("/api/v1/services")]
public class ServiceController : ControllerBase
{
    private readonly IMapper _mapper;
    private readonly IServiceRegistry _registry;
    private readonly IServiceManager _manager;
    private readonly IValidator<ServiceConfigDto> _serviceConfigValidator;

    public ServiceController(IMapper mapper, IServiceRegistry registry, IServiceManager manager,
        IValidator<ServiceConfigDto> serviceConfigValidator)
    {
        _mapper = mapper;
        _registry = registry;
        _manager = manager;
        _serviceConfigValidator = serviceConfigValidator;
    }

    [HttpGet("all")]
    [ProducesResponseType(typeof(ServiceListResponse), 200)]
    public IActionResult GetAllServices()
    {
        var services = _registry.GetAllServices();
        return Ok(new ServiceListResponse
        {
            Success = true,
            Data = services.Select(_mapper.Map<ServiceDetailsDto>)
        });
    }

    [HttpGet("view-details")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [ProducesResponseType(typeof(ErrorException), 401)]
    [ProducesResponseType(typeof(ErrorException), 404)]
    [ProducesResponseType(typeof(ServiceDataResponse), 200)]
    public IActionResult GetServiceDetail([FromQuery] string id)
    {
        // Check for role
        if (HttpContext.IsAdministrator())
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

        var exported = _mapper.Map<ServiceData>(services.ToExportObject());
        return Ok(new ServiceDataResponse
        {
            Success = true,
            Result = exported
        });
    }

    [HttpPatch("edit")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [ProducesResponseType(typeof(ErrorException), 400)]
    [ProducesResponseType(typeof(ErrorException), 401)]
    [ProducesResponseType(typeof(GenericOkResult), 200)]
    public async Task<IActionResult> UpdateServiceDetails([FromBody] ServiceConfigDto configDto)
    {
        // Check for role
        if (HttpContext.IsAdministrator())
        {
            return Unauthorized(new ErrorException
            {
                Error = true,
                Messages = ["Not allowed"]
            });
        }
        
        var validation = await _serviceConfigValidator.ValidateAsync(configDto);
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

        var updateConfig = _mapper.Map<ServiceConfig>(configDto);
        var result = await _manager.UpdateServiceConfiguration(updateConfig);
        if (!result)
        {
            return BadRequest(new ErrorException
            {
                Error = true,
                Messages = ["Updating of service failed."]
            });
        }

        return Ok(new GenericOkResult
        {
            Success = true
        });
    }

    [HttpPost("calculator")]
    [ProducesResponseType(typeof(ErrorException), 401)]
    [ProducesResponseType(typeof(ServiceCalculationResult), 200)]
    public IActionResult CalculatePrice([FromBody] CalculationRequestDto? request)
    {
        if (request == null)
        {
            return BadRequest(new ErrorException
            {
                Error = true,
                Messages = [ "Invalid Request" ]
            });
        }

        var receipt = new List<ServiceCalculationDescriptor>();
        foreach (var (key, value) in request.Items)
        {
            var service = _registry.GetActivatedServiceInstance(key);
            if (service == null)
            {
                return BadRequest(new ErrorException
                {
                    Error = true,
                    Messages = [$"Service ID of \"{key}\" does not exist."]
                });
            }

            var isCalculated = service.TryCalculate(value, out var calculated);
            if (!isCalculated || calculated == null)
            {
                return BadRequest(new ErrorException
                {
                    Error = true,
                    Messages = [ $"Invalid service calculation object on ID: {key}" ]
                });
            }

            receipt.Add(calculated);
        }

        var totalPrice = receipt.Sum(item => item.CalculatedValue);
        return Ok(new ServiceCalculationResult
        {
            Success = true,
            Items = receipt.Select(_mapper.Map<ServiceCalculationDescriptorDto>),
            TotalPrice = totalPrice
        });
    }
}
