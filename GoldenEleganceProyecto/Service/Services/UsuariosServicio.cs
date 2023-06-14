using GoldenEleganceProyecto.Context;
using GoldenEleganceProyecto.Models;
using GoldenEleganceProyecto.Models.Helpers;
using GoldenEleganceProyecto.Service.IServices;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace GoldenEleganceProyecto.Service.Services
{
    public class UsuariosServicio : IUsuariosServicio
    {

        private readonly ApplicationDbContext _context;
        private readonly ILogger _logger;

        public UsuariosServicio(ApplicationDbContext context, ILogger<Usuarios> logger)
        {
            _logger = logger;
            _context = context;

        }

        public Task<ResponseHelper> CrearUsuario(Usuarios vm)
        {
            throw new NotImplementedException();
        }

        public Task<ResponseHelper> EditarUsuario(Usuarios vm)
        {
            throw new NotImplementedException();
        }

        public Task<ResponseHelper> EliminarUsuario(int? Id)
        {
            throw new NotImplementedException();
        }

        public Task<bool> ExisteUsuario(Usuarios asignatura)
        {
            throw new NotImplementedException();
        }

        public Task<bool> ExisteUsuarioPorId(int? Id)
        {
            throw new NotImplementedException();
        }

        public async Task<List<Usuarios>> ObtenerLista()
        {
            List<Usuarios> lista = new List<Usuarios>();
            try
            {
                lista = await _context.Usuario.ToListAsync();

            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return lista;


        }

        public Task<Usuarios> ObtenerPorId(int? Id)
        {
            throw new NotImplementedException();
        }
    }
}
