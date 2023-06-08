using Domain.Common;
using Domain.Projects;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Tags
{
    [Table("Tags")]
    public class Tag : BaseDomainEntity
    {
        public required string Name { get; set; }
        public virtual ICollection<ProjectTag> Projects { get; set; }
    }
}
