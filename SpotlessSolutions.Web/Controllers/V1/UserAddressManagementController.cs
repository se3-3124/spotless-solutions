using AutoMapper;
using FluentValidation;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SpotlessSolutions.Web.Contracts.V1.Requests;
using SpotlessSolutions.Web.Contracts.V1.Responses;
using SpotlessSolutions.Web.Extensions;
using SpotlessSolutions.Web.Services.Accounts;

namespace SpotlessSolutions.Web.Controllers.V1;

[ApiController]
[Route("/api/v1/user/address")]
[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
public class UserAddressManagementController : ControllerBase
{
    private readonly IUserAddressManagement _management;
    private readonly IMapper _mapper;
    private readonly IValidator<AddressCreateRequestDto> _validatorAddressCreateRequest;

    public UserAddressManagementController(IUserAddressManagement management,
        IMapper mapper,
        IValidator<AddressCreateRequestDto> validatorAddressCreateRequest)
    {
        _management = management;
        _mapper = mapper;
        _validatorAddressCreateRequest = validatorAddressCreateRequest;
    }

    [HttpGet]
    [ProducesResponseType(typeof(UserAddressResponse), 200)]
    [ProducesResponseType(typeof(ErrorException), 400)]
    [ProducesResponseType(typeof(ErrorException), 401)]
    [ProducesResponseType(typeof(ErrorException), 404)]
    public async Task<IActionResult> GetSingle([FromQuery] Guid id)
    {
        var userId = HttpContext.GetCurrentSessionUserDataId();
        if (userId.Equals(Guid.Empty))
        {
            return Unauthorized(new ErrorException
            {
                Error = true,
                Messages = [ "Invalid User Session. Try logging in again." ]
            });
        }

        var address = await _management.GetAddressByUser(userId, id);
        if (address == null)
        {
            return NotFound(new ErrorException
            {
                Error = true,
                Messages = [ "Invalid Address ID." ]
            });
        }

        var addressResponse = _mapper.Map<UserAddressResponseDto>(address);
        return Ok(new UserAddressResponse
        {
            Success = true,
            Result = addressResponse
        });
    }

    [HttpGet("all")]
    [ProducesResponseType(typeof(UserAddressesResponse), 200)]
    public async Task<IActionResult> GetAll()
    {
        var userId = HttpContext.GetCurrentSessionUserDataId();
        if (userId.Equals(Guid.Empty))
        {
            return Unauthorized(new ErrorException
            {
                Error = true,
                Messages = [ "Invalid User Session. Try logging in again." ]
            });
        }

        var addresses = await _management.GetAddressesByUser(userId);
        return Ok(new UserAddressesResponse
        {
            Success = true,
            Result = addresses.Select(_mapper.Map<UserAddressResponseDto>)
        });
    }

    [HttpPost("create")]
    [ProducesResponseType(typeof(GenericOkResult), 200)]
    [ProducesResponseType(typeof(ErrorException), 400)]
    public async Task<IActionResult> Create([FromBody] AddressCreateRequestDto request)
    {
        var validator = await _validatorAddressCreateRequest.ValidateAsync(request);
        if (!validator.IsValid)
        {
            return BadRequest(new ErrorException
            {
                Error = true,
                Messages = validator.Errors.Select(x => x.ErrorMessage)
                    .ToArray()
            });
        }
        
        var userId = HttpContext.GetCurrentSessionUserDataId();
        if (userId.Equals(Guid.Empty))
        {
            return Unauthorized(new ErrorException
            {
                Error = true,
                Messages = [ "Invalid User Session. Try logging in again." ]
            });
        }
        
        var mapped = _mapper.Map<CreateAddressDetails>(request);
        var result = await _management.SetNewAddress(userId, mapped);
        if (!result)
        {
            return BadRequest(new ErrorException
            {
                Error = true,
                Messages = ["Invalid address details"]
            });
        }

        return Ok(new GenericOkResult
        {
            Success = true
        });
    }
}
