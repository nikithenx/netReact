
namespace Application.Contracts
{
    public interface IUnitOfWork : IDisposable
    {
        IAppUserRepository AppUserRepository { get; }
        IAppUserProjectRepository AppUserProjectRepository { get; }
        IProjectRepository ProjectRepository { get; }
        ISponsorRepository SponsorRepository { get; }
        ITagRepository TagRepository { get; }
        Task Save();
    }
}
