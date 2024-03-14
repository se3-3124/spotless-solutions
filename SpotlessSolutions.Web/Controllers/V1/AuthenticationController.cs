using AutoMapper;
using FluentValidation;
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
    private readonly IMapper _mapper;
    private readonly IValidator<LoginData> _loginDataValidator;
    private readonly IValidator<RegistrationData> _registrationDataValidator;
    private readonly IValidator<PasswordResetDetails> _passwordRequestResetValidator;
    private readonly IValidator<AccountRecoveryDetails> _accountRecoveryDetailsValidator;

    public AuthenticationController(IAuthentication auth,
        IMapper mapper,
        IValidator<LoginData> loginDataValidator,
        IValidator<RegistrationData> registrationDataValidator,
        IValidator<PasswordResetDetails> passwordRequestResetValidator,
        IValidator<AccountRecoveryDetails> accountRecoveryDetailsValidator)
    {
        _auth = auth;
        _mapper = mapper;
        _loginDataValidator = loginDataValidator;
        _registrationDataValidator = registrationDataValidator;
        _passwordRequestResetValidator = passwordRequestResetValidator;
        _accountRecoveryDetailsValidator = accountRecoveryDetailsValidator;
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

        var data = _mapper.Map<SessionResult>(result);
        return Ok(data);
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

        var mapped = _mapper.Map<UserRegistrationData>(registrationData);
        var result = await _auth.Register(mapped);
        
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
        return Redirect(!result
            ? $"{hostname}/verification/done?status=2"
            : $"{hostname}/verification/done?status=1");
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
}
