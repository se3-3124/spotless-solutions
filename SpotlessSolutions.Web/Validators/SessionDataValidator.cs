using FluentValidation;
using SpotlessSolutions.Web.Contracts.V1.Requests;

namespace SpotlessSolutions.Web.Validators;

public class SessionDataValidator : AbstractValidator<SessionData>
{
    public SessionDataValidator()
    {
        RuleFor(x => x.Token)
            .NotNull()
            .NotEmpty()
            .WithMessage("Session token must not be empty");

        RuleFor(x => x.RefreshToken)
            .NotNull()
            .NotEmpty()
            .WithMessage("Refresh token must be provided");
    }
}
