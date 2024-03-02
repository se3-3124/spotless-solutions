using FluentValidation;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SpotlessSolutions.Web.Contracts.V1.Requests;
using SpotlessSolutions.Web.Contracts.V1.Responses;
using SpotlessSolutions.Web.Services.Authentication;

namespace SpotlessSolutions.Web.Controllers.V1;

[ApiController]
[Route("/api/auth")]
public class AuthenticationController : ControllerBase
{
    private readonly IAuthentication _auth;
    private readonly IValidator<LoginData> _loginDataValidator;
    private readonly IValidator<RegistrationData> _registrationDataValidator;
    private readonly IValidator<PasswordResetDetails> _passwordRequestResetValidator;
    private readonly IValidator<AccountRecoveryDetails> _accountRecoveryDetailsValidator;
    private readonly IValidator<SessionData> _sessionDataValidator;

    public AuthenticationController(IAuthentication auth,
        IValidator<LoginData> loginDataValidator,
        IValidator<RegistrationData> registrationDataValidator,
        IValidator<PasswordResetDetails> passwordRequestResetValidator,
        IValidator<AccountRecoveryDetails> accountRecoveryDetailsValidator,
        IValidator<SessionData> sessionDataValidator)
    {
        _auth = auth;
        _loginDataValidator = loginDataValidator;
        _registrationDataValidator = registrationDataValidator;
        _passwordRequestResetValidator = passwordRequestResetValidator;
        _accountRecoveryDetailsValidator = accountRecoveryDetailsValidator;
        _sessionDataValidator = sessionDataValidator;
    }

    [HttpPost("login")]
    [ProducesResponseType(typeof(ErrorException), 401)]
    [ProducesResponseType(typeof(SessionResult), 200)]
    public async Task<IActionResult> Login([FromBody] LoginData loginData)
    {
        var validator = await _loginDataValidator.ValidateAsync(loginData);
        if (!validator.IsValid)
        {
            var messages = validator.Errors
                .Select(x => x.ErrorMessage)
                .ToArray();
            return Unauthorized(new ErrorException
            {
                Error = true,
                Messages = messages,
            });
        }

        var result = await _auth.Login(loginData.Email, loginData.Password);
        if (result == null)
        {
            return Unauthorized(new ErrorException
            {
                Error = true,
                Messages = ["Invalid credentials."]
            });
        }

        return Ok(new SessionResult
        {
            Token = result.Token,
            RefreshToken = result.RefreshToken
        });
    }

    [HttpPost("register")]
    [ProducesResponseType(typeof(ErrorException), 400)]
    [ProducesResponseType(typeof(GenericOkResult), 200)]
    public async Task<IActionResult> Register([FromBody] RegistrationData registrationData)
    {
        var validator = await _registrationDataValidator.ValidateAsync(registrationData);
        if (!validator.IsValid)
        {
            var messages = validator.Errors
                .Select(x => x.ErrorMessage)
                .ToArray();
            return BadRequest(new ErrorException
            {
                Error = true,
                Messages = messages,
            });
        }

        var result = await _auth.Register(new UserRegistrationData
        {
            FirstName = registrationData.FirstName,
            LastName = registrationData.LastName,
            Email = registrationData.Email,
            Password = registrationData.Password,
            PhoneNumber = registrationData.PhoneNumber
        });
        
        if (!result)
        {
            return BadRequest(new ErrorException
            {
                Error = true,
                Messages = ["Invalid registration data. Check your submission and try again."]
            });
        }

        return Ok(new GenericOkResult
        {
            Success = true
        });
    }

    [HttpGet("confirm")]
    public async Task<IActionResult> VerifyEmail([FromQuery] string t)
    {
        var hostname = Environment.GetEnvironmentVariable("SITE_HOSTNAME")!;
        
        if (string.IsNullOrEmpty(t))
        {
            return Redirect($"{hostname}/verification/done?status=3");
        }

        var result = await _auth.VerifyEmail(t);
        if (!result)
        {
            // return BadRequest(new ErrorException
            // {
            //    Error = true,
            //    Messages = ["Invalid verification token. It may be expired."]
            // });
            return Redirect($"{hostname}/verification/done?status=2");
        }

        return Redirect($"{hostname}/verification/done?status=1");
    }

    [HttpPost("recovery/request")]
    [ProducesResponseType(typeof(ErrorException), 400)]
    [ProducesResponseType(typeof(GenericOkResult), 200)]
    public async Task<IActionResult> RequestPasswordRecovery([FromBody] PasswordResetDetails details)
    {
        var validator = await _passwordRequestResetValidator.ValidateAsync(details);
        if (!validator.IsValid)
        {
            return BadRequest(new ErrorException
            {
                Error = true,
                Messages = validator.Errors.Select(x => x.ErrorMessage).ToArray()
            });
        }

        var result = await _auth.RequestForPasswordReset(details.Email);
        return result
            ? Ok(new GenericOkResult
            {
                Success = true
            })
            : BadRequest(new ErrorException
            {
                Error = true,
                Messages = ["Unable to request for password reset."]
            });
    }

    [HttpPost("recovery/change")]
    [ProducesResponseType(typeof(ErrorException), 400)]
    [ProducesResponseType(typeof(GenericOkResult), 200)]
    public async Task<IActionResult> RecoverPassword([FromBody] AccountRecoveryDetails details)
    {
        var validator = await _accountRecoveryDetailsValidator.ValidateAsync(details);
        if (!validator.IsValid)
        {
            return BadRequest(new ErrorException
            {
                Error = true,
                Messages = validator.Errors.Select(x => x.ErrorMessage).ToArray()
            });
        }

        var result = await _auth.ResetPassword(details.Token, details.Password);
        if (!result)
        {
            return BadRequest(new ErrorException
            {
                Error = true,
                Messages = ["Password reset failed. Request another password recovery and try again."]
            });
        }

        return Ok(new GenericOkResult
        {
            Success = true
        });
    }

    [HttpPost("refresh")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [ProducesResponseType(typeof(ErrorException), 401)]
    [ProducesResponseType(typeof(SessionResult), 200)]
    public async Task<IActionResult> RefreshSession([FromBody] SessionData sessionData)
    {
        var validator = await _sessionDataValidator.ValidateAsync(sessionData);
        if (!validator.IsValid)
        {
            return BadRequest(new ErrorException
            {
                Error = true,
                Messages = validator.Errors.Select(x => x.ErrorMessage).ToArray()
            });
        }

        var result = await _auth.RefreshSession(sessionData.Token, sessionData.RefreshToken);
        if (result == null)
        {
            return BadRequest(new ErrorException
            {
                Error = true,
                Messages = ["Invalid session"]
            });
        }

        return Ok(new SessionResult
        {
            Token = result.Token,
            RefreshToken = result.RefreshToken
        });
    }
}
