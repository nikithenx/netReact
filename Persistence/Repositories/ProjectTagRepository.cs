using Application.Contracts;
using AutoMapper;
using Domain.Projects;

namespace Persistence.Repositories
{
    public class ProjectTagRepository : GenericRepository<ProjectTag>, IProjectTagRepository
    {
        private readonly ApplicationDbContext _db;
        private readonly IMapper _mapper;

        public ProjectTagRepository(ApplicationDbContext db, IMapper mapper) : base(db, mapper)
        {
             _db = db;   
            _mapper = mapper;
        }
    }
}