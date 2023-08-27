using Application.DTOs.Sponsors;

namespace Application.DTOs.Projects
{
    public class ProjectFullDto
    {
        public int Id { get; set; }
        public string Nr { get; set; }
        public string Name { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Description { get; set; }
        public virtual SponsorForProjectDto Sponsor { get; set; }
        public virtual ICollection<ProjectAppUserBaseDto> AppUsers { get; set; }
        public virtual ICollection<ProjectTagBaseDto> Tags { get; set; }
    }
}