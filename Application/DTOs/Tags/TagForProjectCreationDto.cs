using System.ComponentModel.DataAnnotations;

namespace Application.DTOs.Tags
{
    public class TagForProjectCreationDto
    {
        [Required]
        [Range(1, int.MaxValue)]
        public int TagId { get; set; }
    }
}
