using Application.Contracts;
using Application.DTOs.AppUsers;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.AppUsers;
using Microsoft.EntityFrameworkCore;

namespace Persistence.Repositories
{
    public class AppUserRepository : GenericRepository<AppUser>, IAppUserRepository
    {
        private readonly ApplicationDbContext _db;
        private readonly IMapper _mapper;

        public AppUserRepository(ApplicationDbContext db, IMapper mapper) : base(db, mapper)
        {
            _db = db;   
            _mapper = mapper;
        }

        public async Task<IEnumerable<AppUserForSearchDto>> GetForSearch()
            => await _db.AppUsers.ProjectTo<AppUserForSearchDto>(_mapper.ConfigurationProvider).ToListAsync();
    }
}
