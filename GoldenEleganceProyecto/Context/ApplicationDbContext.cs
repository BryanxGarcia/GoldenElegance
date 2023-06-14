using GoldenEleganceProyecto.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace GoldenEleganceProyecto.Context
{
    
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options): base(options){ }
            public DbSet<Rol> Roles { get; set; }
            public DbSet<Categoria> Categorias { get; set; }
            public DbSet<Usuarios> Usuario { get; set; }
            public DbSet<Productos> Productos { get; set; }
            public DbSet<Venta> Ventas { get; set; }
        
    }
}

