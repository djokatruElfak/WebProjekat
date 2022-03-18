using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace Models
{
    public class BolnicaContext : DbContext
    {
        public DbSet<Bolnica> bolnice { get; set; }

        public DbSet<Bolest> bolesti { get; set; }

        public DbSet<Pacijent> pacijenti { get; set; }

        public DbSet<Krevet> kreveti { get; set; }

        public DbSet<Doktor> doktori { get; set; }

        public BolnicaContext(DbContextOptions options) : base(options)
        {

        }

        

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Pacijent>()
                .HasOne(c => c.pacijentSpoj)
                .WithOne(c => c.pacijent)
                .HasForeignKey<Krevet>(c => c.krevetID);

        }
        
    }
}