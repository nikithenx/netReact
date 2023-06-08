using Application.DTOs.AppUsers;
using Domain.AppUsers;

namespace Application.Contracts
{
    public interface IAppUserRepository : IGenericRepository<AppUser>
    {
        Task<IEnumerable<AppUserForSearchDto>> GetForSearch();
    }
}
