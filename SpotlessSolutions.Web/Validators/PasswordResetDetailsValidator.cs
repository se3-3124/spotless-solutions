using FluentValidation;
using SpotlessSolutions.Web.Contracts.V1.Requests;

namespace SpotlessSolutions.Web.Validators;

public class PasswordResetDetailsValidator : AbstractValidator<PasswordResetDetails>
{
    public PasswordResetDetailsValidator()
    {
        RuleFor(opts => opts.Email)
            .EmailAddress()
            .NotEmpty()
            .NotNull()
            .WithMessage("Email address is required.");
    }
}
