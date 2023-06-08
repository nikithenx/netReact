using Domain.Tags;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Projects
{
    [Table("ProjectsTags")]
    public class ProjectTag
    {
        public int Id { get; set; }
        [ForeignKey("Project")]
        public int ProjectId { get; set; }
        [ForeignKey("Tag")]
        public int TagId { get; set; }

        public virtual Project Project { get; set; }
        public virtual Tag Tag { get; set; }
    }
}
