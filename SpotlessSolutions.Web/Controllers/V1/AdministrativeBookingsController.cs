using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SpotlessSolutions.Web.Contracts.V1.Requests;
using SpotlessSolutions.Web.Contracts.V1.Responses;
using SpotlessSolutions.Web.Extensions;
using SpotlessSolutions.Web.Services.Bookings;

namespace SpotlessSolutions.Web.Controllers.V1;

[Route("/api/v1/bookings/administrative")]
[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
public class AdministrativeBookingsController : ControllerBase
{
    private readonly IBookingManager _bookingManager;
    private readonly IBookingQuery _bookingQuery;
    private readonly IMapper _mapper;

    public AdministrativeBookingsController(IBookingManager bookingManager,
        IBookingQuery bookingQuery,
        IMapper mapper)
    {
        _bookingManager = bookingManager;
        _bookingQuery = bookingQuery;
        _mapper = mapper;
    }

    [HttpGet("monthly")]
    [ProducesResponseType(typeof(ErrorException), 401)]
    [ProducesResponseType(typeof(BookingResult), 200)]
    public async Task<IActionResult> GetBookingsByMonth([FromQuery] int year, [FromQuery] int month)
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

        var result = await _bookingQuery.GetBooking(year, month);
        var data = result.Select(_mapper.Map<BookingDetailsDto>);
        return Ok(new BookingResult
        {
            Success = true,
            Data = data
        });
    }

    [HttpGet("range")]
    [ProducesResponseType(typeof(ErrorException), 401)]
    [ProducesResponseType(typeof(BookingResult), 200)]
    public async Task<IActionResult> GetBookingsByDateRange([FromQuery] DateTime start, [FromQuery] DateTime end)
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

        var result = await _bookingQuery.GetBooking(start, end);
        return Ok(new BookingResult
        {
            Success = true,
            Data = result.Select(_mapper.Map<BookingDetailsDto>)
        });
    }

    [HttpPatch("state")]
    [ProducesResponseType(typeof(ErrorException), 500)]
    [ProducesResponseType(typeof(ErrorException), 401)]
    [ProducesResponseType(typeof(GenericOkResult), 200)]
    public async Task<IActionResult> UpdateBookingState([FromBody] BookingUpdateDetails details)
    {
        // Check the role
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
            var result = await _bookingManager.UpdateBookingState(details.Id, details.State);
            if (!result)
            {
                return BadRequest(new ErrorException
                {
                    Error = true,
                    Messages =
                    [
                        "Invalid request on changing state."
                    ]
                });
            }
            
            return Ok(new GenericOkResult
            {
                Success = true
            });
        }
        catch
        {
            return StatusCode(StatusCodes.Status500InternalServerError, new ErrorException
            {
                Error = true,
                Messages =
                [
                    "An error occured at updating state. Please try again later."
                ]
            });
        }
    }

    [HttpPost("message")]
    [ProducesResponseType(typeof(ErrorException), 500)]
    [ProducesResponseType(typeof(ErrorException), 401)]
    [ProducesResponseType(typeof(GenericOkResult), 200)]
    public async Task<IActionResult> SendEmail([FromBody] EmailDetails details)
    {
        // Check the role
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
            var result = await _bookingManager.SendEmail(details.UserId, details.Subject, details.Body);
            if (!result)
            {
                return BadRequest(new ErrorException
                {
                    Error = true,
                    Messages =
                    [
                        "Invalid request on sending mail."
                    ]
                });
            }
            
            return Ok(new GenericOkResult
            {
                Success = true
            });
        }
        catch
        {
            return StatusCode(StatusCodes.Status500InternalServerError, new ErrorException
            {
                Error = true,
                Messages =
                [
                    "An error occured at sending email."
                ]
            });
        }
    }
}
