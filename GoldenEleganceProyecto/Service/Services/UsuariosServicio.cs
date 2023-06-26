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

        public async Task<ResponseHelper> CrearUsuario(Usuarios vm)
        {
            ResponseHelper response = new ResponseHelper();
            try
            {
                Usuarios modeloUsuario = new Usuarios();
                modeloUsuario = vm;
                _context.Usuario.AddAsync(modeloUsuario);
                await _context.SaveChangesAsync();

                response.Success = true;
                response.Message = "EL Usuario se ha creado Perfectamente";

            }
            catch (Exception error)
            {
                response.Success = false;
                response.Message = "El Usuario No se pudo crear!";
                _logger.LogError(error.Message);
            }
            return response;
        }

        public async Task<ResponseHelper> EditarUsuario(Usuarios vm)
        {
            ResponseHelper response = new ResponseHelper();
            try
            {
                Usuarios modeloUsuario = new Usuarios();
                modeloUsuario = await _context.Usuario.FindAsync(vm.PkUsuario);

                modeloUsuario.PkUsuario = vm.PkUsuario;
                modeloUsuario.Nombre = vm.Nombre;
                modeloUsuario.Username = vm.Username;
                modeloUsuario.Apellido = vm.Apellido;
                modeloUsuario.Correo = vm.Correo;
                modeloUsuario.Password = vm.Password;
                modeloUsuario.Telefono = vm.Telefono;
                modeloUsuario.Direccion = vm.Direccion;
                modeloUsuario.FKRol = vm.FKRol;
                modeloUsuario.IsDeleted = vm.IsDeleted;

                _context.Usuario.Update(modeloUsuario);
                await _context.SaveChangesAsync();

                response.Message = "Usuario Actualixada Perfectamente!";
                response.Success = true;
            }
            catch (Exception error)
            {
                response.Success = false;
                response.Message = "Eror AL Momento de crear al Usuario!";
                _logger.LogError(error.Message);
            }
            return response;
        }

        public async Task<ResponseHelper> EliminarUsuario(int? Id)
        {
            ResponseHelper response = new ResponseHelper();
            try
            {
                Usuarios modeloUsuario = new Usuarios();
                modeloUsuario = await _context.Usuario.FindAsync(Id);


                if (modeloUsuario == null || modeloUsuario.PkUsuario > 0)
                {
                    response.Success = false;
                    response.Message = "No se ha podido encontrar al usuario";
                }
                else
                {
                    modeloUsuario.IsDeleted = true;
                    _context.Usuario.Update(modeloUsuario);
                    _context.SaveChanges();

                    response.Success = true;
                    response.Message = "El Usuario Se ha Eliminado Perfectamente";
                }
            }
            catch (Exception error)
            {

                response.Success = false;
                response.Message = "No se ha podido ELiminar al Usuario!";
                _logger.LogError(error.Message);
            }
            return response;
        }

        public Task<bool> ExisteUsuario(Usuarios asignatura)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> ExisteUsuarioPorId(int? Id)
        {
            var usuarioEncontrado = false;
            try
            {
                Usuarios modeloUsuario = new Usuarios();

                modeloUsuario = await _context.Usuario.FindAsync(Id);

                if (modeloUsuario.PkUsuario != null && modeloUsuario.PkUsuario > 0)
                {
                    usuarioEncontrado = true;
                }
                else
                {
                    usuarioEncontrado = false;
                }
            }
            catch (Exception error)
            {
                _logger.LogError(error.Message);
            }
            return usuarioEncontrado;
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

        public async Task<Usuarios> ObtenerPorId(int? Id)
        {
            Usuarios modeloUsuario = new Usuarios();

            try
            {
                modeloUsuario = await _context.Usuario.FindAsync(Id);

            }
            catch (Exception error)
            {
                _logger.LogError(error.Message);
            }
            return modeloUsuario;
        }
    }
}
