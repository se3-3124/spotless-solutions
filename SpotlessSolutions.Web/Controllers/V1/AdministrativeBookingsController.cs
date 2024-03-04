using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SpotlessSolutions.Web.Contracts.V1.Requests;
using SpotlessSolutions.Web.Contracts.V1.ResponseMappers;
using SpotlessSolutions.Web.Contracts.V1.Responses;
using SpotlessSolutions.Web.Data.Models;
using SpotlessSolutions.Web.Services.Bookings;

namespace SpotlessSolutions.Web.Controllers.V1;

[Route("/api/v1/bookings/administrative")]
[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
public class AdministrativeBookingsController : ControllerBase
{
    private readonly IBookingManager _booking;

    public AdministrativeBookingsController(IBookingManager booking)
    {
        _booking = booking;
    }

    [HttpGet("monthly")]
    [ProducesResponseType(typeof(ErrorException), 401)]
    [ProducesResponseType(typeof(BookingResult), 200)]
    public async Task<IActionResult> GetBookingsByMonth([FromQuery] int year, [FromQuery] int month)
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

        var result = await _booking.GetBooking(year, month);
        var bookingObjects = result.ToList();
        var data = bookingObjects.Select(x => x.ToBookingDetails());
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
        
        var result = await _booking.GetBooking(start, end);
        var bookingObjects = result as BookingObject[] ?? result.ToArray();
        var data = bookingObjects.Select(x => x.ToBookingDetails());
        return Ok(new BookingResult
        {
            Success = true,
            Data = data
        });
    }

    [HttpPatch("state")]
    [ProducesResponseType(typeof(ErrorException), 500)]
    [ProducesResponseType(typeof(ErrorException), 401)]
    [ProducesResponseType(typeof(GenericOkResult), 200)]
    public async Task<IActionResult> UpdateBookingState([FromBody] BookingUpdateDetails details)
    {
        // Check the role
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

        try
        {
            var result = await _booking.UpdateBookingState(details.Id, details.State);
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
}
