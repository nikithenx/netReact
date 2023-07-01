using Identity.Configurations;
using Identity.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Identity
{
    public class ApplicationIdentityDbContext : IdentityDbContext<ApiUser>
    {
        public ApplicationIdentityDbContext(DbContextOptions<ApplicationIdentityDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            new RoleConfiguration().Configure(builder.Entity<IdentityRole>());
            new UserConfiguration().Configure(builder.Entity<ApiUser>());
            new UserRoleConfiguration().Configure(builder.Entity<IdentityUserRole<string>>());
        }
    }
}