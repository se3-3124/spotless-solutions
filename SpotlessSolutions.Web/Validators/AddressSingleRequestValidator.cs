using FluentValidation;
using SpotlessSolutions.Web.Contracts.V1.Requests;

namespace SpotlessSolutions.Web.Validators;

public class AddressSingleRequestValidator : AbstractValidator<AddressSingleRequest>
{
    public AddressSingleRequestValidator()
    {
        RuleFor(x => x.Id)
            .NotNull()
            .NotEmpty()
            .Must(x => !x.Equals(Guid.Empty))
            .WithMessage("Invalid Address ID.");
    }
}
