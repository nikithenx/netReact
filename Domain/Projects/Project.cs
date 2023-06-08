using Domain.AppUsers;
using Domain.Common;
using Domain.Sponsors;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Projects
{
    [Table("Projects")]
    public class Project : BaseDomainEntity
    {
        [ForeignKey("Sponsor")]
        public int SponsorId { get; set; }
        public string Nr { get; set; }  
        public required string Name { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Description { get; set; }

        public virtual Sponsor Sponsor { get; set; }
        public virtual ICollection<AppUserProject> AppUsers { get; set; }
        public virtual ICollection<ProjectTag> Tags { get; set; }
    }
}
