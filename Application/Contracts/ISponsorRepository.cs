using Application.DTOs.Sponsors;
using Domain.Sponsors;

namespace Application.Contracts
{
    public interface ISponsorRepository : IGenericRepository<Sponsor>
    {
        Task<IReadOnlyList<SponsorReadOnlyDto>> GetReadOnlyList();
    }
}
