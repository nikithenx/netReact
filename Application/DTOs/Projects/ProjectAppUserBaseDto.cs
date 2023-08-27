
using Application.DTOs.AppUsers;

namespace Application.DTOs.Projects
{
    public class ProjectAppUserBaseDto
    {
        public int Id { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        public virtual AppUserForSearchDto AppUser { get; set; }
    }
}