using Microsoft.EntityFrameworkCore;
using Leads.Api.Models;

namespace Leads.Api.Data
{
    public class LeadsDbContext : DbContext
    {
        public LeadsDbContext(DbContextOptions<LeadsDbContext> options)
            : base(options) { }

        public DbSet<Lead> Leads { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Lead>().ToTable("Leads");

            base.OnModelCreating(modelBuilder);
        }
    }
}
