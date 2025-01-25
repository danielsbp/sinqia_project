using APIPontoTuristico.Data.Map;
using APIPontoTuristico.Models;
using Microsoft.EntityFrameworkCore;

namespace APIPontoTuristico.Data
{
    public class PontoTuristicoDBContext : DbContext 
    {
        public PontoTuristicoDBContext(DbContextOptions<PontoTuristicoDBContext> options) 
            : base(options)
        {

        } 

        public DbSet<PontoTuristicoModel> PontosTuristicos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new PontoTuristicoMap());
            base.OnModelCreating(modelBuilder);
        }
    }
}
