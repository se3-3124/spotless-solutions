using System.Text.RegularExpressions;
using FluentValidation;
using SpotlessSolutions.Web.Contracts.V1.Requests;

namespace SpotlessSolutions.Web.Validators;

public class ServiceConfigurationValidator : AbstractValidator<ServiceConfig>
{
    public ServiceConfigurationValidator()
    {
        RuleFor(x => x.TargetingServiceId)
            .NotNull()
            .NotEmpty()
            .WithMessage("Service ID must be specified or valid.");
        
        RuleFor(x => x.Name)
            .NotNull()
            .NotEmpty()
            .WithMessage("Service name must not be empty!");

        RuleFor(x => x.Description)
            .NotNull()
            .NotEmpty()
            .WithMessage("Service description must not be empty!");

        RuleFor(x => x.Config)
            .NotNull()
            .NotEmpty()
            .Must(x =>
            {
                var data = x.Split(",").ToList();

                return data.Count > 1
                    ? data.All(ValidateField)
                    : ValidateField(data[0]);
            })
            .WithMessage("Service configuration must be valid!");
    }

    private static bool ValidateField(string field)
    {
        if (!Regex.IsMatch(field, @"^(.+):(float|\(float\|float\)):(\d+|\(\d+\|\d+\))$"))
        {
            return false;
        }

        var config = field.Split(":");
        if (config[1] == "(float|float)" && !Regex.IsMatch(config[2], @"^\(\d+\|\d+\)$"))
        {
            return false;
        }

        if (config[1] == "float" && !Regex.IsMatch(config[2], @"^\d+$"))
        {
            return false;
        }

        return true;
    }
}
