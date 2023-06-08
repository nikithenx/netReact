using Application.DTOs.Projects;

namespace Application.DTOs.AppUsers
{
    public class AppUserProjectDto
    {
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        public virtual ProjectDto Project { get; set; }
    }
}
