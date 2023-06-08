using Domain.Projects;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Sponsors
{
    [Table("Sponsors")]
    public class Sponsor
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Region { get; set; }

        public virtual ICollection<Project> Projects { get; set; }
    }
}
