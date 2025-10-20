using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System.IO;

namespace Leads.Api.Data
{
    public class LeadsDbContextFactory : IDesignTimeDbContextFactory<LeadsDbContext>
    {
        public LeadsDbContext CreateDbContext(string[] args)
        {
            // Carrega as configurações do appsettings.json
            IConfigurationRoot configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .Build();

            var optionsBuilder = new DbContextOptionsBuilder<LeadsDbContext>();

            var connectionString = configuration.GetConnectionString("DefaultConnection");

            optionsBuilder.UseSqlServer(connectionString);

            return new LeadsDbContext(optionsBuilder.Options);
        }
    }
}
