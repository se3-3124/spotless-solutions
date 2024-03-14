using FluentValidation;
using SpotlessSolutions.Web.Contracts.V1.Requests;

namespace SpotlessSolutions.Web.Validators;

public class BookingAppointmentDtoValidator : AbstractValidator<BookingAppointmentDto>
{
    public BookingAppointmentDtoValidator()
    {
        RuleFor(x => x.Schedule)
            .Must(x => x.ToUniversalTime() > DateTime.UtcNow)
            .WithMessage("You cannot book days that is already passed.");

        RuleFor(x => x.MainServiceId)
            .NotEmpty()
            .NotNull()
            .WithMessage("Invalid service ID.");

        RuleFor(x => x.MainServiceConfig)
            .NotEmpty()
            .NotNull()
            .WithMessage("Invalid configuration for main service.");

        RuleFor(x => x.AddressId)
            .NotEmpty()
            .NotNull()
            .Must(x => !x.Equals(Guid.Empty))
            .WithMessage("Invalid Address ID.");

        RuleForEach(x => x.Addons)
            .Must(x => !string.IsNullOrEmpty(x.Key) && !string.IsNullOrEmpty(x.Value))
            .WithMessage("Invalid addons object.");
    }
}
