using GoldenEleganceProyecto.Context;
using GoldenEleganceProyecto.Models;
using GoldenEleganceProyecto.Models.Helpers;
using GoldenEleganceProyecto.Service.IServices;

namespace GoldenEleganceProyecto.Service.Services
{
    public class VentasServicio : IVentasServicio
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger _logger;
        public VentasServicio(ApplicationDbContext context, ILogger<Usuarios> logger)
        {
            _logger = logger;
            _context = context;

        }

        public Task<ResponseHelper> CrearVenta(Venta vm)
        {
            throw new NotImplementedException();
        }

        public Task<ResponseHelper> EditarVenta(Venta vm)
        {
            throw new NotImplementedException();
        }

        public Task<ResponseHelper> EliminarVenta(int? Id)
        {
            throw new NotImplementedException();
        }

        public Task<List<Venta>> ObtenerLista()
        {
            throw new NotImplementedException();
        }

        public Task<Venta> ObtenerPorId(int? Id)
        {
            throw new NotImplementedException();
        }
    }
}
