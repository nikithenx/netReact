using System.ComponentModel.DataAnnotations;
using Application.DTOs.AppUsers;

namespace Application.DTOs.Projects
{
    public class ProjectAppUserDto
    {
        public int Id { get; set; }
        public int ProjectId { get; set; }
        public int AppUserId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        public virtual AppUserDto AppUser { get; set; }
    }

    public class ProjectAppUserUpdateDto
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public int ProjectId { get; set; }
        [Required]
        public int AppUserId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}
