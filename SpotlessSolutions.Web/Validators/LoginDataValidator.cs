using FluentValidation;
using SpotlessSolutions.Web.Contracts.V1.Requests;

namespace SpotlessSolutions.Web.Validators;

public class LoginDataValidator : AbstractValidator<LoginData>
{
    public LoginDataValidator()
    {
        RuleFor(opts => opts.Email)
            .NotNull()
            .NotEmpty()
            .EmailAddress()
            .WithMessage("Email must not be empty!");

        RuleFor(opts => opts.Password)
            .NotNull()
            .NotEmpty()
            .WithMessage("Password is required.");
    }
}
