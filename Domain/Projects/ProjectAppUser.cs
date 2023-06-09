using Domain.AppUsers;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Projects
{
    [Table("ProjectsAppUsers")]
    public class ProjectAppUser
    {
        public int Id { get; init; }
        [ForeignKey("Project")]
        public int ProjectId { get; set; }
        [ForeignKey("AppUser")]
        public int AppUserId { get; set; }
        public DateTime StartDate { get; set; } 
        public DateTime EndDate { get; set; }   

        public virtual AppUser AppUser { get; set; }
        public virtual Project Project { get; set; }
    }
}
