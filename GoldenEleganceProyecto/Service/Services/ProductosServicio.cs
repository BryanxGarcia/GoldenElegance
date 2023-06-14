using GoldenEleganceProyecto.Context;
using GoldenEleganceProyecto.Models;
using GoldenEleganceProyecto.Models.Helpers;
using GoldenEleganceProyecto.Service.IServices;
using Microsoft.EntityFrameworkCore;

namespace GoldenEleganceProyecto.Service.Services
{
    public class ProductosServicio : IProductosServicio
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger _logger;
        public ProductosServicio(ApplicationDbContext context, ILogger<Usuarios> logger)
        {
            _logger = logger;
            _context = context;

        }

        public Task<ResponseHelper> CrearProducto(Productos vm)
        {
            throw new NotImplementedException();
        }

        public Task<ResponseHelper> EditarProducto(Productos vm)
        {
            throw new NotImplementedException();
        }

        public Task<ResponseHelper> EliminarProducto(int? Id)
        {
            throw new NotImplementedException();
        }

        public async Task<List<Productos>> ObtenerLista()
        {
            List<Productos> lista = new List<Productos>();

            lista = await _context.Productos.ToListAsync();
            return lista;
        }

        public Task<Productos> ObtenerPorId(int? Id)
        {
            throw new NotImplementedException();
        }
    }
}
