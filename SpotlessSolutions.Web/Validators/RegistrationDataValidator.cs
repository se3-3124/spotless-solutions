using System.Text.RegularExpressions;
using FluentValidation;
using SpotlessSolutions.Web.Contracts.V1.Requests;

namespace SpotlessSolutions.Web.Validators;

public class RegistrationDataValidator : AbstractValidator<RegistrationData>
{
    public RegistrationDataValidator()
    {
        RuleFor(opts => opts.FirstName)
            .NotNull()
            .NotEmpty()
            .WithMessage("First Name is required.");

        RuleFor(opts => opts.LastName)
            .NotNull()
            .NotEmpty()
            .WithMessage("Last Name is required.");

        RuleFor(opts => opts.Email)
            .EmailAddress()
            .NotNull()
            .NotEmpty()
            .WithMessage("Email is required.");

        RuleFor(opts => opts.Password)
            .MinimumLength(8)
            .MaximumLength(99)
            .Must(x =>
            {
                if (string.IsNullOrEmpty(x))
                {
                    return false;
                }

                var uppercaseTest = new Regex("[A-Z]", RegexOptions.None);
                var lowercaseTest = new Regex("[a-z]", RegexOptions.None);
                var numericalTest = new Regex("\\d+", RegexOptions.None);
                var symbolTest = new Regex("\\w+");

                return uppercaseTest.IsMatch(x) &&
                       lowercaseTest.IsMatch(x) &&
                       numericalTest.IsMatch(x) &&
                       symbolTest.IsMatch(x);
            })
            .WithMessage("Password must meet the password complexity requirement");

        RuleFor(opts => opts.PhoneNumber)
            .Must(x =>
            {
                if (string.IsNullOrEmpty(x))
                {
                    return false;
                }

                var regex = new Regex(@"(\+63|0)(\d{2,4}-?\d{3,4}-?\d{4})");
                return regex.IsMatch(x);
            })
            .WithMessage("Invalid phone number");
    }
}
