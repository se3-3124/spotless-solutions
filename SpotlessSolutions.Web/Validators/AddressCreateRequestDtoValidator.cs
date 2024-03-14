using FluentValidation;
using SpotlessSolutions.Web.Contracts.V1.Requests;

namespace SpotlessSolutions.Web.Validators;

public class AddressCreateRequestDtoValidator : AbstractValidator<AddressCreateRequestDto>
{
    public AddressCreateRequestDtoValidator()
    {
        RuleFor(x => x.Barangay)
            .NotEmpty()
            .NotNull()
            .WithMessage("Invalid Barangay detail");
        
        RuleFor(x => x.City)
            .NotEmpty()
            .NotNull()
            .WithMessage("Invalid City detail");
        
        RuleFor(x => x.District)
            .NotEmpty()
            .NotNull()
            .WithMessage("Invalid District detail");

        RuleFor(x => x.Province)
            .NotEmpty()
            .NotNull()
            .WithMessage("Invalid Province detail");

        RuleFor(x => x.Street)
            .NotEmpty()
            .NotNull()
            .WithMessage("Invalid Street detail");

        RuleFor(x => x.PostalCode)
            .NotEmpty()
            .NotNull()
            .WithMessage("Invalid Postal Code detail");
    }
}
