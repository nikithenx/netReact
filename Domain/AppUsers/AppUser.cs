using Domain.Common;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.AppUsers
{
    [Table("AppUsers")]
    public class AppUser : BaseDomainEntity
    {
        public required string Forename { get; set; }
        public required string Surname { get; set; }
        public required string Email { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public string PhoneNumber { get; set; }
        public string Picture { get; set; }

        public virtual ICollection<AppUserProject> Projects { get; set; }
    }
}
