using Application.DTOs.AppUsers;

namespace Application.DTOs.Projects
{
    public class ProjectAppUserDto
    {
        public int Id { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        public virtual AppUserForSearchDto AppUser { get; set; }
    }
}
