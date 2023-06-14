using GoldenEleganceProyecto.Context;
using GoldenEleganceProyecto.Models;
using GoldenEleganceProyecto.Models.Helpers;
using GoldenEleganceProyecto.Service.IServices;
using Microsoft.EntityFrameworkCore;

namespace GoldenEleganceProyecto.Service.Services
{
    public class CategoriasServicio : ICategoriasServicio
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger _logger;
        public CategoriasServicio(ApplicationDbContext context, ILogger<Usuarios> logger)
        {
            _logger = logger;
            _context = context;

        }

        public Task<ResponseHelper> CrearCategoria(Categoria vm)
        {
            throw new NotImplementedException();
        }

        public Task<ResponseHelper> EditarCategoria(Categoria vm)
        {
            throw new NotImplementedException();
        }

        public Task<ResponseHelper> EliminarCategoria(int? Id)
        {
            throw new NotImplementedException();
        }

        public async Task<List<Categoria>> ObtenerLista()
        {
            List<Categoria> Cat = new List<Categoria>();

            Cat = await _context.Categorias.ToListAsync();
            return Cat;
        }

        public Task<Categoria> ObtenerPorId(int? Id)
        {
            throw new NotImplementedException();
        }
    }
}
