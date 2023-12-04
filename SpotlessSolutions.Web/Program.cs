using FluentValidation;
using Microsoft.AspNetCore.Identity;
using SpotlessSolutions.Web.Data;
using SpotlessSolutions.Web.Extensions;
using SpotlessSolutions.Web.Security.Tokens;
using SpotlessSolutions.Web.Services;
using SpotlessSolutions.Web.Services.Authentication.OAuth2.Google;
using SpotlessSolutions.Web.Services.Mailer;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddIdentity<IdentityUser, IdentityRole>(options =>
    {
        options.User.RequireUniqueEmail = true;
    })
    .AddEntityFrameworkStores<DataContext>()
    .AddDefaultTokenProviders();

// Cors-configuration
// By default this is disabled when it is in production since the SPA will be hosted the same
// as the server, therefore this will be ignored
const string corsName = "cors_config";

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: corsName, policy =>
    {
        policy.WithOrigins("*")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

builder.Services.AddControllersWithViews();
builder.Services.AddValidatorsFromAssemblyContaining<Program>();
builder.Services.InstallDataContexts(builder.Configuration);
builder.Services.InstallJwtConfig(builder.Configuration);
builder.Services.InstallGoogleConfig(builder.Configuration);
builder.Services.InstallSwaggerDocumentation();
builder.Services.InstallMailerSettings(builder.Configuration);
builder.Services.InstallServices();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}
else
{
    app.UseCors(corsName);
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

// This middleware blocks the request when if its still on the blocking period
app.UseIpBlockingFilter();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

await app.RunAsync();
