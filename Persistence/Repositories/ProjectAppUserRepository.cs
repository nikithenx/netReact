using Application.Contracts;
using AutoMapper;
using Domain.Projects;

namespace Persistence.Repositories
{
    public class ProjectAppUserRepository : GenericRepository<ProjectAppUser>, IProjectAppUserRepository
    {
        private readonly ApplicationDbContext _db;
        private readonly IMapper _mapper;

        public ProjectAppUserRepository(ApplicationDbContext db, IMapper mapper) : base(db, mapper)
        {
            _db = db;   
            _mapper = mapper;
        }
    }
}
