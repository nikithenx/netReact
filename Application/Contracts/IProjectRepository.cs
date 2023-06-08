using Application.DTOs.Projects;
using Domain.Projects;

namespace Application.Contracts
{
    public interface IProjectRepository : IGenericRepository<Project>
    {
        Task<IReadOnlyList<ProjectDto>> GetReadOnlyList();
        Task<string> ComputeNr();
    }
}
