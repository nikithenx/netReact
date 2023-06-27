using Domain.Login;
using Identity.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public class AuthController : ControllerBase
    {
        private readonly IIdentityService _identityService;  

        public AuthController(IIdentityService identityService)  
        {  
            _identityService = identityService;  
        }  

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register(LoginUserDto userDto)
        {
            try
            {
                var identityResult = await _identityService.RegisterUserAsync(userDto);

                if (identityResult.Succeeded == false)
                {
                    foreach (var error in identityResult.Errors)
                    {
                        ModelState.AddModelError(error.Code, error.Description);
                    }
                    return BadRequest(ModelState);
                }

                await _identityService.RegisterRolesAsync(userDto, new List<string>(1) { Static.Roles.User });
                return Accepted();
            }
            catch (Exception ex)
            {
                return Problem($"Something went wrong during registering: {ex.Message}");
            }
        }

        [Route("login")]  
        [HttpPost]  
        public async Task<IActionResult> LoginAsync([FromBody] LoginUserDto userDto)  
        {  
            try 
            {
                var user = await _identityService.LoginAsync(userDto);
                if (user is null)                
                    return Unauthorized(userDto);

                var token = await _identityService.GenerateToken(user);

                return new ObjectResult(true) { StatusCode = StatusCodes.Status202Accepted, Value = token };
            }
            catch(Exception ex) 
            {
                return Problem($"Something went wrong during the login attempt: {ex.Message}");
            }
        } 
    }
}