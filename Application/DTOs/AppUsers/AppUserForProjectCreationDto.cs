using System.ComponentModel.DataAnnotations;

namespace Application.DTOs.AppUsers
{
    public class AppUserForProjectCreationDto
    {
        [Required]
        [Range(1, int.MaxValue)]
        public int AppUserId { get; set; }
        [Required]
        public DateTime StartDate { get; set; }
        [Required]
        public DateTime EndDate { get; set; }
    }
}
