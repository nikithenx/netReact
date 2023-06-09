using Microsoft.EntityFrameworkCore;
using Domain.Projects;
using Domain.Sponsors;
using Domain.Tags;
using Domain.AppUsers;

namespace Persistence
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<AppUser> AppUsers { get; set; }
        public DbSet<Project> Projects { get; set; }
         public DbSet<ProjectAppUser> ProjectsAppUsers { get; set; }
        public DbSet<ProjectTag> ProjectsTags { get; set; }
        public DbSet<Sponsor> Sponsors { get; set; }
        public DbSet<Tag> Tags { get; set; }
    }
}
