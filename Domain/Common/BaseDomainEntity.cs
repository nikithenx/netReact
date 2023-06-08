namespace Domain.Common
{
    public class BaseDomainEntity
    {
        public int Id { get; init; }
        public DateTime CreatedOn { get; set; } = DateTime.Now;
    }
}
