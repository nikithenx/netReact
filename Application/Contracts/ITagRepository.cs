using Application.DTOs.Tags;
using Domain.Tags;

namespace Application.Contracts
{
    public interface ITagRepository : IGenericRepository<Tag>
    {
        Task<IEnumerable<TagDto>> GetForAutocomplete();
    }
}
