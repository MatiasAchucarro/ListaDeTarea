using Microsoft.EntityFrameworkCore;
using WebApiCine.Controllers.Molds;


namespace WebApiCine.Context
{
    public class PeliculasContext : DbContext
    {
        public PeliculasContext(DbContextOptions<PeliculasContext> options)
    : base(options)
        {
        }
        public DbSet<Pelicula> Pelicula { get; set; }
        public DbSet<Imagen> Imagen { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Pelicula>()
              .HasOne(p => p.Imagen);
              
        }
    }
}
