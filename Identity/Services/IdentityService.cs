using System.Text;
using Domain.Login;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using Identity.Models;

namespace Identity.Services
{
    public interface IIdentityService
    {
        Task<string> GenerateToken(ApiUser user);
        Task<ApiUser> LoginAsync(LoginUserDto userDto);
        Task<IdentityResult> RegisterUserAsync(LoginUserDto userDto);
        Task<IdentityResult> RegisterRolesAsync(LoginUserDto userDto, IEnumerable<string> roles);
    }

    public class IdentityService : IIdentityService
    {
        private readonly UserManager<ApiUser> _userManager;
        private readonly IConfiguration _configuration;

        public IdentityService(UserManager<ApiUser> userManager, IConfiguration configuration)
        {
            _userManager = userManager;
            _configuration = configuration;
        }

        public async Task<string> GenerateToken(ApiUser user)
        {
            var securitykey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var credentials = new SigningCredentials(securitykey, SecurityAlgorithms.HmacSha256);

            var roles = await _userManager.GetRolesAsync(user);
            var roleClaims = roles.Select(q => new Claim(ClaimTypes.Role, q)).ToList();

            var userClaims = await _userManager.GetClaimsAsync(user);

            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim(JwtRegisteredClaimNames.Sid, user.Id)
            }
            .Union(userClaims)
            .Union(roleClaims);

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Issuer"],
                claims: claims,                
                expires: DateTime.UtcNow.AddMinutes(Convert.ToInt32(_configuration["Jwt:Duration"])),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public async Task<ApiUser> LoginAsync(LoginUserDto userDto)
        {
            var user = await _userManager.FindByEmailAsync(userDto.Email);
            if (user == null)
                return null;

            if (!await _userManager.CheckPasswordAsync(user, userDto.Password))
                return null;

            return user;
        }

        public async Task<IdentityResult> RegisterUserAsync(LoginUserDto userDto)
        {
            var user = new ApiUser
            {
                Email = userDto.Email,
                UserName = userDto.Email,
            };

            return await _userManager.CreateAsync(user, userDto.Password);
        }

        public async Task<IdentityResult> RegisterRolesAsync(LoginUserDto userDto, IEnumerable<string> roles)
        {      
            var user = new ApiUser
            {
                Email = userDto.Email,
                UserName = userDto.Email,
            };

            if (roles.Count() == 1)
                return await _userManager.AddToRoleAsync(user, roles.First());

            return await _userManager.AddToRolesAsync(user, roles);
        }
    }
}