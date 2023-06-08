using Application.DTOs.AppUsers;
using Application.DTOs.Tags;
using System.ComponentModel.DataAnnotations;

namespace Application.DTOs.Projects
{
    public partial class ProjectDto
    {
        public int Id { get; set; }
        public string Nr { get; set; }
        public string Name { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Description { get; set; }
        public string SponsorName { get; set; }
    }

    public class ProjectCreateDto
    {
        [Required]
        public int SponsorId { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public DateTime StartDate { get; set; }
        [Required]
        public DateTime EndDate { get; set; }
        [Required]
        public string Description { get; set; }

        public virtual ICollection<AppUserForProjectCreationDto> AppUsers { get; set; }
        public virtual ICollection<TagForProjectCreationDto> Tags { get; set; }
    }

    public class ProjectUpdateDto
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public int SponsorId { get; set; }
        [Required]
        public string Nr { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public DateTime StartDate { get; set; }
        [Required]
        public DateTime EndDate { get; set; }
        [Required]
        public string Description { get; set; }
    }
}
