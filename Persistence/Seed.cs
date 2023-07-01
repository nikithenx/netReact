using Identity.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;

namespace Persistence
{
    public class Seed
    {

        public static async Task SeedData(IServiceProvider serviceProvider)
        {
            await SeedRoles(serviceProvider);
            await SeedUsers(serviceProvider);
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
    }
}