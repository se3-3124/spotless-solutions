using Microsoft.AspNetCore.Mvc;
using SpotlessSolutions.Web.Contracts.V1.Responses;
using SpotlessSolutions.Web.Services.Bookings;

namespace SpotlessSolutions.Web.Controllers.V1;

[Route("/api/v1/bookings/")]
public class BookingsController : ControllerBase
{
    private readonly IBookingManager _booking;

    public BookingsController(IBookingManager booking)
    {
        _booking = booking;
    }

    [HttpGet("monthly")]
    [ProducesResponseType(typeof(AnonymizedBookingResult), 200)]
    public async Task<IActionResult> GetBookingsByMonth([FromQuery] int year, [FromQuery] int month)
    {
        var data = await _booking.GetAnonymizedBookingDetails(year, month);

        return Ok(new AnonymizedBookingResult
        {
            Success = true,
            Schedules = data
        });
    }

    [HttpGet("range")]
    [ProducesResponseType(typeof(AnonymizedBookingResult), 200)]
    public async Task<IActionResult> GetBookingsByDateRange([FromQuery] DateTime start, [FromQuery] DateTime end)
    {
        var data = await _booking.GetAnonymizedBookingDetails(start, end);
        
        return Ok(new AnonymizedBookingResult
        {
            Success = true,
            Schedules = data
        });
    }
}
