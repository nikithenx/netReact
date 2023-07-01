using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Identity.Configurations
{
     public class UserRoleConfiguration : IEntityTypeConfiguration<IdentityUserRole<string>>
    {
        public void Configure(EntityTypeBuilder<IdentityUserRole<string>> builder)
        {
            builder.HasData(
                new IdentityUserRole<string>
                {
                    RoleId = "62fd86d7-756b-4062-8c91-765c333ed518",
                    UserId = "9152f5ab-7fc2-400a-8a29-0da2f5c6972a"
                },
                new IdentityUserRole<string>
                {
                    RoleId = "5a623415-1155-4a27-87f1-d7963b9f2a52",
                    UserId = "88a34a6d-39f4-416e-b539-81fd5881ebe0"
                }
            );
        }
    }
}