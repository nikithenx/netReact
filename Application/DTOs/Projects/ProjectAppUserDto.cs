namespace Application.DTOs.Projects
{
    public class ProjectAppUserDto
    {
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        public virtual ProjectDto Project { get; set; }
    }
}
