using Domain.AppUsers;
using Domain.Projects;
using Domain.Sponsors;
using Domain.Tags;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(ApplicationDbContext db)
        {
            bool usersSeeded = await SeedUsers(db);
            bool sponsorsSeeded = await SeedSponsors(db);
            bool tagsSeeded = await SeedTags(db);

            if (usersSeeded || sponsorsSeeded || tagsSeeded)
                await db.SaveChangesAsync();

            if (await SeedProjects(db))
                await db.SaveChangesAsync();
        }

        private static async Task<bool> SeedUsers(ApplicationDbContext db)
        {
            if (!db.AppUsers.Any())
            {
                int numberOfUsers = 10;
                var users = new List<AppUser>(numberOfUsers);

                var rand = new Random();

                for(int i = 0; i < numberOfUsers; i++)
                {
                    int randomNr = rand.Next(0, 9);

                    users.Add(new AppUser
                    {
                        Forename = "User",
                        Surname = $"0{i}",
                        Email = $"user0{i}@test.com",
                        Country = "Germany",
                        City = $"City0{randomNr}",
                        PhoneNumber = $"+49 {randomNr}{1}{0} {2}{randomNr}{randomNr}{3} 865",
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
                int numberOfSponsors = 5;
                var sponsors = new List<Sponsor>(numberOfSponsors);

                for(int i = 0; i < numberOfSponsors; i++)
                {
                    sponsors.Add(new Sponsor
                    {
                        Forename = "Sponsor",
                        Surname = $"0{i}",
                        Email = $"sponsor0{i}@test.com",
                        Region = "Germany",
                    });
                }

                await db.Sponsors.AddRangeAsync(sponsors);
                return true;
            }
            return false;
        }

        private static async Task<bool> SeedTags(ApplicationDbContext db)
        {
            if (!db.Tags.Any())
            {
                int numberOfTags = 10;
                var tags = new List<Tag>(numberOfTags);

                for(int i = 0; i < numberOfTags; i++)
                {
                    tags.Add(new Tag
                    {
                        Name = $"Tag{i}"
                    });
                }

                await db.Tags.AddRangeAsync(tags);
                return true;
            }
            return false;
        }

        private static async Task<bool> SeedProjects(ApplicationDbContext db)
        {
            if (!db.Projects.Any())
            {
                int numberOfProjects = 50;
                var projects = new List<Project>(numberOfProjects);

                var sponsorIds = await db.Sponsors.Select(x => x.Id).ToListAsync();
                int sponsorIndex = 0;

                var tagIds = await db.Tags.Select(x => x.Id).ToListAsync();
                int tagIndex = 0;

                var appUserIds = await db.AppUsers.Select(x => x.Id).ToListAsync();
                int appUserIndex = 0;

                int year = DateTime.Now.Year;
                DateTime now = DateTime.Now;

                // No project without sponsor (foreign key)
                if (sponsorIds.Count == 0) return false;

                for(int i = 0; i < numberOfProjects; i++)
                {
                    projects.Add(new Project
                    {
                        SponsorId = sponsorIds[sponsorIndex],
                        Nr = $"{year}-{i + 1:0000}",
                        Name = $"Project{i}",
                        StartDate = now,
                        EndDate = now.AddMonths(i + 1),
                        Description = $"This is Project Number {i}",
                        /* AppUsers = new List<ProjectAppUser> 
                        { 
                            new() { AppUserId = appUserIds[appUserIndex], StartDate = now, EndDate = now.AddMonths(i) },
                            new() { AppUserId = appUserIds[appUserIndex + 1], StartDate = now, EndDate = now.AddMonths(i) }
                        }, */
                        Tags = new List<ProjectTag> { new() { TagId = tagIds[tagIndex] } },
                    });

                    sponsorIndex++;
                    tagIndex++;
                    appUserIndex++;

                    if (sponsorIndex == sponsorIds.Count)
                        sponsorIndex = 0;   

                    if (tagIndex == tagIds.Count)
                        tagIndex = 0;  

                    if (appUserIndex == appUserIds.Count - 1)
                        appUserIndex = 0;               
                }

                await db.Projects.AddRangeAsync(projects);
                return true;
            }
            return false;
        }
    }
}
