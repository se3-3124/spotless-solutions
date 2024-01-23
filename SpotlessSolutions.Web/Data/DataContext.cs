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
    public DbSet<ServiceDescriptor> ServiceDescriptors { get; set; }
}
