#pragma warning disable CS8618

using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SpotlessSolutions.Web.Data.Models;
using ServiceDescriptor = SpotlessSolutions.Web.Data.Models.ServiceDescriptor;

namespace SpotlessSolutions.Web.Data;

public class DataContext : IdentityDbContext
{
    public DataContext(DbContextOptions<DataContext> options) : base(options)
    { }
    
    public DbSet<UserData> UserData { get; set; }
    public DbSet<AccountBinding> Bindings { get; set; }
    public DbSet<Address> Addresses { get; set; }
    public DbSet<AddOnServiceDescriptor> AddOns { get; set; }
    public DbSet<AddOnServiceFieldObject> AddOnFields { get; set; }
    public DbSet<AddOnServiceRestrictionRule> AddOnServiceRestrictionRules { get; set; }
    public DbSet<ServiceDescriptor> ServiceDescriptors { get; set; }
    public DbSet<ServiceDescriptorPricingPreset> ServiceDescriptorPricingPresets { get; set; }
    public DbSet<ServiceDescriptorPricingRule> ServiceDescriptorPricingRules { get; set; }
    public DbSet<UserBooking> UserBookings { get; set; }
    public DbSet<UserServiceBookDetail> UserServiceBookDetails { get; set; }
    public DbSet<UserHomeConfigDetail> UserHomeConfigDetails { get; set; }
    public DbSet<UserAddOnBookDetail> UserAddOnBookDetails { get; set; }
}
