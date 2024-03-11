using AutoMapper;
using FluentValidation;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SpotlessSolutions.Web.Contracts.V1.Requests;
using SpotlessSolutions.Web.Contracts.V1.Responses;
using SpotlessSolutions.Web.Extensions;
using SpotlessSolutions.Web.Services.Bookings;
using SpotlessSolutions.Web.Services.Services;

namespace SpotlessSolutions.Web.Controllers.V1;

[ApiController]
[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
[Route("/api/v1/bookings")]
public class BookingController : ControllerBase
{
    private readonly IBookingManager _booking;
    private readonly IMapper _mapper;
    private readonly IServiceRegistry _registry;
    private readonly IValidator<BookingAppointmentDto> _bookingAppointmentDtoValidator;

    public BookingController(
        IBookingManager booking,
        IMapper mapper,
        IServiceRegistry registry,
        IValidator<BookingAppointmentDto> bookingAppointmentDtoValidator)
    {
        _booking = booking;
        _mapper = mapper;
        _registry = registry;
        _bookingAppointmentDtoValidator = bookingAppointmentDtoValidator;
    }

    [HttpPost("appointment")]
    public async Task<IActionResult> BookAppointment([FromBody] BookingAppointmentDto appointment)
    {
        var validator = await _bookingAppointmentDtoValidator.ValidateAsync(appointment);
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

        var mapped = _mapper.Map<BookingRequestObject>(appointment);
        if (mapped == null)
        {
            return BadRequest(new ErrorException
            {
                Error = true,
                Messages = [ "Invalid booking request" ]
            });
        }

        var book = await _booking.ScheduleBooking(userId, mapped);
        if (!book)
        {
            return BadRequest(new ErrorException
            {
                Error = true,
                Messages = [ "Invalid booking request" ]
            });
        }

        return Ok(new GenericOkResult
        {
            Success = true
        });
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
