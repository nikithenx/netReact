using Domain.Common;
using Domain.Projects;
using System.ComponentModel.DataAnnotations.Schema;


namespace Domain.AppUsers
{
    [Table("AppUsersProjects")]
    public class AppUserProject : BaseDomainEntity
    {
        [ForeignKey("AppUser")]
        public int AppUserId { get; set; }
        [ForeignKey("Project")]
        public int ProjectId { get; set; }
        public DateTime StartDate { get; set; } 
        public DateTime EndDate { get; set; }   

        public virtual AppUser AppUser { get; set; }
        public virtual Project Project { get; set; }
    }
}
