
namespace Application.Contracts
{
    public interface IUnitOfWork : IDisposable
    {
        IAppUserRepository AppUserRepository { get; }
        IProjectRepository ProjectRepository { get; }
        IProjectAppUserRepository ProjectAppUserRepository { get; }
        IProjectTagRepository ProjectTagRepository { get; }
        ISponsorRepository SponsorRepository { get; }
        ITagRepository TagRepository { get; }
        Task Save();
    }
}
