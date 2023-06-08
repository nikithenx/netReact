using Application.Contracts;
using Domain.AppUsers;

namespace Persistence.Repositories
{
    public class AppUserProjectRepository : GenericRepository<AppUserProject>, IAppUserProjectRepository
    {
        private readonly ApplicationDbContext _db;

        public AppUserProjectRepository(ApplicationDbContext db) : base(db)
        {
            _db = db;   
        }
    }
}
