using Domain.AppUsers;
using Domain.Projects;
using Domain.Sponsors;
using Domain.Tags;
using Identity.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Persistence
{
    public class Seed
    {

        public static async Task SeedData(IServiceProvider serviceProvider)
        {
            await SeedRoles(serviceProvider);
            await SeedUsers(serviceProvider);

            var dbContext = serviceProvider.GetService<ApplicationDbContext>();
            await SeedSponsors(dbContext);
            await SeedUsers(dbContext);
            await SeedTags(dbContext);
            await dbContext.SaveChangesAsync();
            await SeedProjects(dbContext);
        }

        private static async Task SeedRoles(IServiceProvider serviceProvider)
        {
            var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();

            if (!await roleManager.RoleExistsAsync("Admin"))
            {
                await roleManager.CreateAsync(new IdentityRole("Admin"));
            }
            if (!await roleManager.RoleExistsAsync("User"))
            {
                await roleManager.CreateAsync(new IdentityRole("User"));
            }
        }

        private static async Task SeedUsers(IServiceProvider serviceProvider)
        {
            var userManager = serviceProvider.GetRequiredService<UserManager<ApiUser>>();

            if (await userManager.FindByNameAsync("admin@localhost.com") is null)
            {
                var user = new ApiUser
                {
                    Email = "admin@localhost.com",
                    UserName = "admin@localhost.com"                   
                };

                await userManager.CreateAsync(user, "P@ssword1");
                await userManager.AddToRoleAsync(user, "Admin");
            }

            if (await userManager.FindByNameAsync("user@localhost.com") is null)
            {
                var user = new ApiUser
                {
                    Email = "user@localhost.com",
                    UserName = "user@localhost.com"                   
                };

                await userManager.CreateAsync(user, "P@ssword1");
                await userManager.AddToRoleAsync(user, "User");
            }
        }

        private static async Task SeedSponsors(ApplicationDbContext db)
        {
            if (!await db.Sponsors.AnyAsync())
            {
                var sponsors = new List<Sponsor>()
                {
                    new Sponsor
                    {
                        Forename = "Jason",
                        Surname = "Beth",
                        Email = "jason.beth@example.com",
                        Region = "North America"
                    },
                    new Sponsor
                    {
                        Forename = "Donald",
                        Surname = "Bump",
                        Email = "donald.bump@maga.com",
                        Region = "North America"
                    },
                    new Sponsor
                    {
                        Forename = "Max",
                        Surname = "Maier",
                        Email = "max.maier@dotnet.com",
                        Region = "Europe"
                    },
                    new Sponsor
                    {
                        Forename = "Li",
                        Surname = "Yan",
                        Email = "wanli.yan@example.com",
                        Region = "Asia"
                    }
                };

                await db.Sponsors.AddRangeAsync(sponsors);
            }
        }

        private static async Task SeedUsers(ApplicationDbContext db)
        {
            if (!await db.AppUsers.AnyAsync())
            {
                var users = new List<AppUser>()
                {
                    new AppUser
                    {
                        Forename = "Walter",
                        Surname = "White",
                        Email = "walter.white@ww.com",
                        Country = "USA",
                        City = "New York",
                        PhoneNumber = "0123456789",                        
                    },
                    new AppUser
                    {
                        Forename = "Melissa",
                        Surname = "Schmitt",
                        Email = "melissa.schmitt@dotnet.com",
                        Country = "Germany",
                        City = "Munich",
                        PhoneNumber = "0123456789",                        
                    },
                    new AppUser
                    {
                        Forename = "Alesia",
                        Surname = "Alejandro",
                        Email = "alesia.alejandro@teleco.com",
                        Country = "Spain",
                        City = "Madrid",
                        PhoneNumber = "0123456789",                        
                    },
                    new AppUser
                    {
                        Forename = "Francois",
                        Surname = "Haulande",
                        Email = "francois.haulande@example.com",
                        Country = "France",
                        City = "Marseille",
                        PhoneNumber = "0123456789",                        
                    }
                };

                await db.AppUsers.AddRangeAsync(users);
            }
        }

        private static async Task SeedTags(ApplicationDbContext db)
        {
            if (!await db.Tags.AnyAsync())
            {
                var tags = new List<Tag>()
                {
                    new Tag
                    {
                        Name = "Digitalization"
                    },
                    new Tag
                    {
                        Name = "Target Operating Model"
                    },
                    new Tag
                    {
                        Name = "Streamlining Processes"
                    },
                    new Tag
                    {
                        Name = "Efficiency"
                    },
                    new Tag
                    {
                        Name = "Market Growth"
                    },
                    new Tag
                    {
                        Name = "Mergers & Acquisitions"
                    }
                };

                await db.Tags.AddRangeAsync(tags);
            }
        }

        private static async Task SeedProjects(ApplicationDbContext db)
        {
            if (!await db.Projects.AnyAsync())
            {
                var projects = new List<Project>()
                {
                    new Project
                    {
                        Nr = "2023-0001",
                        Name = "Simplify",
                        StartDate = new DateTime(2023, 8, 1),
                        EndDate = new DateTime(2023, 11, 30),
                        Description = "Simplification of business processes"
                    },
                    new Project
                    {
                        Nr = "2023-0002",
                        Name = "All in One",
                        StartDate = new DateTime(2023, 7, 1),
                        EndDate = new DateTime(2023, 8, 31),
                        Description = "Carve-Out of digitalization unit"
                    },
                    new Project
                    {
                        Nr = "2023-0003",
                        Name = "Way Forward",
                        StartDate = new DateTime(2023, 10, 1),
                        EndDate = new DateTime(2023, 12, 31),
                        Description = "Strategic alignment of business units"
                    },
                    new Project
                    {
                        Nr = "2023-0004",
                        Name = "TrueExpedite",
                        StartDate = new DateTime(2023, 8, 1),
                        EndDate = new DateTime(2023, 12, 30),
                        Description = "Analysis of all processes that offer potential for streamlining"
                    },
                    new Project
                    {
                        Nr = "2023-0005",
                        Name = "Customer Excel",
                        StartDate = new DateTime(2023, 7, 15),
                        EndDate = new DateTime(2023, 10, 31),
                        Description = "Define a new customer market strategy"
                    }
                };

                var sponsorIds = await db.Sponsors.Select(x => x.Id).ToArrayAsync();

                foreach (var project in projects)
                {
                    Random r = new();
                    int index = r.Next(0, sponsorIds.Length);
                    project.SponsorId = sponsorIds[index];
                }

                await db.Projects.AddRangeAsync(projects);
                await db.SaveChangesAsync();
            }
        }

    }
}