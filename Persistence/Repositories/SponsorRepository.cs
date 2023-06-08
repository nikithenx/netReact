using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using Application.Contracts;
using Domain.Sponsors;
using Application.DTOs.Sponsors;

namespace Persistence.Repositories
{
    public class SponsorRepository : GenericRepository<Sponsor>, ISponsorRepository
    {
        private readonly ApplicationDbContext _db;
        private readonly IMapper _mapper;

        public SponsorRepository(ApplicationDbContext db, IMapper mapper) : base(db)
        {
            _db = db;
            _mapper = mapper;
        }

        public async Task<IReadOnlyList<SponsorReadOnlyDto>> GetReadOnlyList()
        {
            return await _db.Sponsors.ProjectTo<SponsorReadOnlyDto>(_mapper.ConfigurationProvider).ToListAsync();
        }
    }
}
