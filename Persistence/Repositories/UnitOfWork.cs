using AutoMapper;
using Application.Contracts;

namespace Persistence.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IMapper _mapper;
        private IAppUserRepository _appUserRepository;
        private IAppUserProjectRepository _appUserProjectRepository;
        private IProjectRepository _projectRepository;
        private ISponsorRepository _sponsorRepository;
        private ITagRepository _tagRepository;

        public UnitOfWork(ApplicationDbContext context, IMapper mapper)
        {
            _dbContext = context;
            _mapper = mapper;
        }

        public IAppUserRepository AppUserRepository =>
            _appUserRepository ??= new AppUserRepository(_dbContext, _mapper);

        public IAppUserProjectRepository AppUserProjectRepository =>
            _appUserProjectRepository ??= new AppUserProjectRepository(_dbContext, _mapper);

        public IProjectRepository ProjectRepository => 
            _projectRepository ??= new ProjectRepository(_dbContext, _mapper);

        public ISponsorRepository SponsorRepository =>
            _sponsorRepository ??= new SponsorRepository(_dbContext, _mapper);  
        
        public ITagRepository TagRepository =>
            _tagRepository ??= new TagRepository(_dbContext, _mapper);


        public void Dispose()
        {
            _dbContext.Dispose();
            GC.SuppressFinalize(this);
        }

        public async Task Save()
        {
            await _dbContext.SaveChangesAsync();
        }
    }
}
