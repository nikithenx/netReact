using Domain.Projects;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Tags
{
    [Table("Tags")]
    public class Tag
    {
        public int Id { get; set; } 
        public string Name { get; set; }

        public virtual ICollection<ProjectTag> Projects { get; set; }
    }
}
