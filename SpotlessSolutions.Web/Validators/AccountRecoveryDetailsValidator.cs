using System.Text.RegularExpressions;
using FluentValidation;
using SpotlessSolutions.Web.Contracts.V1.Requests;

namespace SpotlessSolutions.Web.Validators;

public class AccountRecoveryDetailsValidator : AbstractValidator<AccountRecoveryDetails>
{
    public AccountRecoveryDetailsValidator()
    {
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
            });

        RuleFor(opts => opts.Token)
            .NotEmpty()
            .NotNull();
    }
}