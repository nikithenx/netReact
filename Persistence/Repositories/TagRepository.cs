using Application.Contracts;
using Application.DTOs.Tags;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Tags;
using Microsoft.EntityFrameworkCore;

namespace Persistence.Repositories
{
    public class TagRepository : GenericRepository<Tag>, ITagRepository
    {
        private readonly ApplicationDbContext _db;
        private readonly IMapper _mapper;

        public TagRepository(ApplicationDbContext db, IMapper mapper) : base(db)
        {
            _db = db;
            _mapper = mapper;
        }

        public async Task<IEnumerable<TagBaseDto>> GetForAutocomplete()
            => await _db.Tags.ProjectTo<TagBaseDto>(_mapper.ConfigurationProvider).ToListAsync();
    }
}
