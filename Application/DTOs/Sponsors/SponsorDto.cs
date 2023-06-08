using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.Sponsors
{
    public partial class SponsorDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Region { get; set; }
    }

    public class SponsorCreateDto
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Region { get; set; }
    }
}
