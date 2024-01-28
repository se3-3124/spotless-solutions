using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SpotlessSolutions.Web.Contracts.V1.Responses;
using SpotlessSolutions.Web.Data.Models;
using SpotlessSolutions.Web.Services.Booking;

namespace SpotlessSolutions.Web.Controllers.V1;

[ApiController]
[Route("/api/bookings")]
[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
public class BookingManagementController : ControllerBase
{
    private readonly IBookingManager _bookingManager;

    public BookingManagementController(IBookingManager bookingManager)
    {
        _bookingManager = bookingManager;
    }

    [HttpGet("admin/monthly")]
    [ProducesResponseType(typeof(BookingListResult), 200)]
    [ProducesResponseType(typeof(ErrorException), 400)]
    [ProducesResponseType(typeof(ErrorException), 401)]
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
        
        if (year is <= 0 or > 9999)
        {
            return BadRequest(new ErrorException
            {
                Error = true,
                Messages = ["Invalid year."]
            });
        }

        if (month is <= 0 or > 12)
        {
            return BadRequest(new ErrorException
            {
                Error = true,
                Messages = ["Invalid month."]
            });
        }

        var result = await _bookingManager.GetAllBookings(year, month);
        return Ok(new BookingListResult
        {
            Success = true,
            Result = result.ToArray()
        });
    }

    [HttpGet("admin/range")]
    [ProducesResponseType(typeof(BookingListResult), 200)]
    [ProducesResponseType(typeof(ErrorException), 400)]
    [ProducesResponseType(typeof(ErrorException), 401)]
    public async Task<IActionResult> GetBookingsByDateRange([FromQuery] string start, [FromQuery] string end)
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
        
        try
        {
            var dateStart = DateTime.Parse(start).ToUniversalTime();
            var dateEnd = DateTime.Parse(end).ToUniversalTime();

            var result = await _bookingManager.GetAllBookings(dateStart, dateEnd);
            return Ok(new BookingListResult
            {
                Success = true,
                Result = result.ToArray()
            });
        }
        catch
        {
            return BadRequest(new ErrorException
            {
                Error = true,
                Messages = ["Invalid time ranges"]
            });
        }
    }
}
