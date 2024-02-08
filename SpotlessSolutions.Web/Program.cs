using FluentValidation;
using Microsoft.AspNetCore.Identity;
using SpotlessSolutions.Web.Data;
using SpotlessSolutions.Web.Data.Seeding;
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

builder.Services.InstallJwtConfig(builder.Configuration);
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("*")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

builder.Services.AddControllersWithViews();
builder.Services.AddValidatorsFromAssemblyContaining<Program>();
builder.Services.InstallDataContexts(builder.Configuration);
builder.Services.InstallGoogleConfig(builder.Configuration);
builder.Services.InstallSwaggerDocumentation();
builder.Services.InstallMailerSettings(builder.Configuration);
builder.Services.InstallServices();

var app = builder.Build();

// Prepare database
await app.ApplySeed();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}
else
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.UseCors();

// This middleware blocks the request when if its still on the blocking period
app.UseIpBlockingFilter();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

await app.RunAsync();
