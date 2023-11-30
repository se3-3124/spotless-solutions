using Microsoft.OpenApi.Models;

namespace SpotlessSolutions.Web.Extensions;

public static class SwaggerDocumentationSetup
{
    public static void InstallSwaggerDocumentation(this IServiceCollection serviceCollection)
    {
        serviceCollection.AddEndpointsApiExplorer();
        serviceCollection.AddSwaggerGen(options =>
        {
            options.SwaggerDoc("v1", new OpenApiInfo
            {
                Title = "SpotlessSolutions",
                Version = "v1"
            });
            
            options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
            {
                Name = "Authorization",
                Description = "Jwt Authorization Header using the Bearer Scheme",
                Type = SecuritySchemeType.ApiKey,
                In = ParameterLocation.Header
            });
            
            var securityRequirement = new OpenApiSecurityRequirement
            { 
                {
                    new OpenApiSecurityScheme
                    {
                        Reference = new OpenApiReference
                        {
                            Id = "Bearer",
                            Type = ReferenceType.SecurityScheme
                        }
                    },
                    Array.Empty<string>()
                }
            };
            
            options.AddSecurityRequirement(securityRequirement);
        });
    }
}
