namespace Application.DTOs.AppUsers
{
    public class AppUserDto
    {
        public string Forename { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public string PhoneNumber { get; set; }
        public string Picture { get; set; }

        public virtual ICollection<AppUserProjectDto> Projects { get; set; }
    }
}
