using Application.DTOs.Tags;

namespace Application.DTOs.Projects
{
    public class ProjectTagDto
    {
        public int Id { get; set; }
        public int ProjectId { get; set; }
        public int TagId { get; set; }

        public virtual ProjectDto Project { get; set; }
        public virtual TagDto Tag { get; set; }
    }
}