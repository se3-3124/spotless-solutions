#pragma warning disable CS8618

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
    
    public DbSet<ServiceConfig> ServiceConfigs { get; set; }
    public DbSet<Booking> Bookings { get; set; }
    public DbSet<FileUploadBucket> Bucket { get; set; }
}
