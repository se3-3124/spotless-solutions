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
    [ProducesResponseType(typeof(GenericOkResult), 200)]
    [ProducesResponseType(typeof(ErrorException), 400)]
    [ProducesResponseType(typeof(ErrorException), 401)]
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

    [HttpPost("appointment/upload")]
    [ProducesResponseType(typeof(FileUploadResult), 200)]
    [ProducesResponseType(typeof(ErrorException), 400)]
    [ProducesResponseType(typeof(ErrorException), 500)]
    public async Task<IActionResult> UploadFile(IFormFile file)
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
        
        if (file.Length > 10485760)
        {
            return BadRequest(new ErrorException
            {
                Error = true,
                Messages = [ "File exceeds the maximum file size of 10MB." ]
            });
        }

        if (!MimeTypes.TryGetMimeType(file.FileName, out var type))
        {
            return BadRequest(new ErrorException
            {
                Error = true,
                Messages = [ "Invalid file." ]
            });
        }

        if (!type.StartsWith("image/"))
        {
            return BadRequest(new ErrorException
            {
                Error = true,
                Messages = [ "Invalid file." ]
            });
        }

        var result = await _booking.UploadAttachment(userId, file.FileName, file.OpenReadStream());
        if (result == Guid.Empty)
        {
            return StatusCode(500, new ErrorException
            {
                Error = true,
                Messages = [ "An unknown error occured." ]
            });
        }

        return Ok(new FileUploadResult
        {
            Success = true,
            AttachmentId = result
        });
    }

    [HttpGet("attachments")]
    [ProducesResponseType(typeof(ErrorException), 404)]
    public async Task<IActionResult> ReadAttachedFile([FromQuery] Guid userId, [FromQuery] Guid attachmentId)
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

        try
        {
            var result = await _booking.GetAttachment(userId, attachmentId);
            if (result == null)
            {
                return NotFound(new ErrorException
                {
                    Error = true,
                    Messages = ["Specified resource cannot be found"]
                });
            }

            return PhysicalFile(result.TemporaryStoredPath, result.ContentType);
        }
        catch
        {
            return NotFound(new ErrorException
            {
                Error = true,
                Messages = ["Not found"]
            });
        }
    }
}
