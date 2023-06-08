using Domain.Common;
using Domain.Projects;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Sponsors
{
    [Table("Sponsors")]
    public class Sponsor : BaseDomainEntity
    {
        public required string Forename { get; set; }
        public required string Surname { get; set; }
        public required string Email { get; set; }
        public string Region { get; set; }

        public virtual ICollection<Project> Projects { get; set; }
    }
}
