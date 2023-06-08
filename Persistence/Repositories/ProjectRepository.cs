using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using Application.Contracts;
using Domain.Projects;
using Application.DTOs.Projects;

namespace Persistence.Repositories
{
    public class ProjectRepository : GenericRepository<Project>, IProjectRepository
    {
        private readonly ApplicationDbContext _db;
        private readonly IMapper _mapper;

        public ProjectRepository(ApplicationDbContext db, IMapper mapper) : base(db, mapper)
        {
            _db = db;
            _mapper = mapper;
        }

        public async Task<string> ComputeNr()
        {
            var latest = await _db.Projects.MaxAsync(x => x.Nr);
            if (!string.IsNullOrEmpty(latest))
            {
                _ = int.TryParse(latest[..4], out var year);
                _ = int.TryParse(latest[4..], out var index);
                

                if (year != DateTime.Now.Year)
                {
                    year = DateTime.Now.Year;
                }

                index++;

                return $"{year}{index:0000}";
            }

            return $"{DateTime.Now.Year}{1:0000}";
        }

        public async Task<IReadOnlyList<ProjectDto>> GetReadOnlyList()
        {
            return await _db.Projects.ProjectTo<ProjectDto>(_mapper.ConfigurationProvider).ToListAsync();
        }
    }
}
