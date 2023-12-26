using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SpotlessSolutions.Web.Data.Models;

namespace SpotlessSolutions.Web.Data;

public class DataContext : IdentityDbContext
{
    public DataContext(DbContextOptions<DataContext> options) : base(options)
    { }
    
    public DbSet<UserData> UserData { get; set; }
    public DbSet<AccountBinding> Bindings { get; set; }
    public DbSet<Address> Addresses { get; set; }
    public DbSet<Models.Services> ServiceDescriptors { get; set; }
}
