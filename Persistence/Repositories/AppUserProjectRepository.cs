using Application.Contracts;
using AutoMapper;
using Domain.AppUsers;

namespace Persistence.Repositories
{
    public class AppUserProjectRepository : GenericRepository<AppUserProject>, IAppUserProjectRepository
    {
        private readonly ApplicationDbContext _db;
        private readonly IMapper _mapper;

        public AppUserProjectRepository(ApplicationDbContext db, IMapper mapper) : base(db, mapper)
        {
            _db = db;   
            _mapper = mapper;
        }
    }
}
