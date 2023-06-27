using System.Text;
using Identity.Models;
using Identity.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace Identity
{
    public static class IdentityServiceRegistration
    {
        public static IServiceCollection ConfigureIdentityServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<ApplicationIdentityDbContext>(options =>
               options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));
            services.AddIdentity<ApiUser, IdentityRole>()
                .AddEntityFrameworkStores<ApplicationIdentityDbContext>().AddDefaultTokenProviders();

            services.AddTransient<IIdentityService, IdentityService>();

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(o =>
                {
                    o.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        ValidateIssuer = true,
                        ValidateLifetime = true,
                        RequireExpirationTime = true,
                        ClockSkew = TimeSpan.Zero,
                        ValidIssuer = configuration["Jwt:Issuer"],
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"])),
                    };
                });

            return services;
        }
    }
}