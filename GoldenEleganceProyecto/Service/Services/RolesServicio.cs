using GoldenEleganceProyecto.Context;
using GoldenEleganceProyecto.Models;
using GoldenEleganceProyecto.Models.Helpers;
using GoldenEleganceProyecto.Service.IServices;

namespace GoldenEleganceProyecto.Service.Services
{
    public class RolesServicio : IRolesServicio
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger _logger;
        public RolesServicio(ApplicationDbContext context, ILogger<Usuarios> logger)
        {
            _logger = logger;
            _context = context;

        }

        public Task<ResponseHelper> CrearRol(Rol vm)
        {
            throw new NotImplementedException();
        }

        public Task<ResponseHelper> EditarRol(Rol vm)
        {
            throw new NotImplementedException();
        }

        public Task<ResponseHelper> EliminarRol(int? Id)
        {
            throw new NotImplementedException();
        }

        public Task<List<Rol>> ObtenerLista()
        {
            throw new NotImplementedException();
        }

        public Task<Rol> ObtenerPorId(int? Id)
        {
            throw new NotImplementedException();
        }
    }
}
