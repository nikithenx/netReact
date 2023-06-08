using Domain.AppUsers;
using Domain.Projects;
using Domain.Sponsors;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(ApplicationDbContext db)
        {
            bool usersSeeded = await SeedUsers(db);
            bool sponsorsSeeded = await SeedSponsors(db);

            if (usersSeeded || sponsorsSeeded)
                await db.SaveChangesAsync();

            if (await SeedProjects(db))
                await db.SaveChangesAsync();
        }

        private static async Task<bool> SeedUsers(ApplicationDbContext db)
        {
            if (!db.AppUsers.Any())
            {
                int numberOfUsers = 100;
                var users = new List<AppUser>(numberOfUsers);

                var rand = new Random();

                for(int i = 0; i < numberOfUsers; i++)
                {
                    users.Add(new AppUser
                    {
                        Forename = "User",
                        Surname = $"{i}",
                        Email = $"user{i}@test.com",
                        Country = "Germany",
                        City = $"City{rand.Next(0, 9)}",
                        PhoneNumber = $"+49 {i}{1}{i} {2}{i}{i}{3} 865",
                        Picture = "",
                    });
                }

                await db.AppUsers.AddRangeAsync(users);
                return true;
            }
            return false;
        }

        private static async Task<bool> SeedSponsors(ApplicationDbContext db)
        {
            if (!db.Sponsors.Any())
            {
                int numberOfSponsors = 50;
                var sponsors = new List<Sponsor>(numberOfSponsors);

                for(int i = 0; i < numberOfSponsors; i++)
                {
                    sponsors.Add(new Sponsor
                    {
                        Forename = "Sponsor",
                        Surname = $"{i}",
                        Email = $"sponsor{i}@test.com",
                        Region = "Germany",
                    });
                }

                await db.Sponsors.AddRangeAsync(sponsors);
                return true;
            }
            return false;
        }

        private static async Task<bool> SeedProjects(ApplicationDbContext db)
        {
            if (!db.Projects.Any())
            {
                int numberOfProjects = 500;
                var projects = new List<Project>(numberOfProjects);

                var sponsorIds = await db.Sponsors.Select(x => x.Id).ToListAsync();
                int sponsorIndex = 0;
                int year = DateTime.Now.Year;

                // No project without sponsor
                if (sponsorIds.Count == 0) return false;

                for(int i = 0; i < numberOfProjects; i++)
                {
                    projects.Add(new Project
                    {
                        SponsorId = sponsorIds[sponsorIndex],
                        Nr = $"{year}-{i + 1:0000}",
                        Name = $"Project{i}",
                        StartDate = DateTime.Now,
                        EndDate = DateTime.Now.AddDays(i + 1),
                        Description = $"This is Project Number {i}",
                    });

                    sponsorIndex++;

                    if (sponsorIndex == sponsorIds.Count)
                        sponsorIndex = 0;                    
                }

                await db.Projects.AddRangeAsync(projects);
                return true;
            }
            return false;
        }
    }
}
