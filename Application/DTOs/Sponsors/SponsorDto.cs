
using Application.DTOs.Projects;

namespace Application.DTOs.Sponsors
{
    public partial class SponsorDto
    {
        public int Id { get; set; }
        public string Forename { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public string Region { get; set; }

        public virtual ProjectDto Project { get; set; }
    }

    public class SponsorCreateDto
    {
        public string Forename { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public string Region { get; set; }
    }
}
