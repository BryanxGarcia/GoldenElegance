using GoldenEleganceProyecto.Context;
using GoldenEleganceProyecto.Models;
using GoldenEleganceProyecto.Models.Helpers;
using GoldenEleganceProyecto.Service.IServices;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

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

        public  async Task<ResponseHelper> CrearRol(Rol vm)
        {
            ResponseHelper response = new ResponseHelper();
            try
            {
                Rol modalRol = new Rol();
                modalRol = vm;

                await _context.Roles.AddAsync(modalRol);
                await _context.SaveChangesAsync();

                response.Success= true;
                response.Message = "El ROl ha sido creado perfectamente";
                

            }
            catch (Exception error)
            {
                response.Success = false;
                response.Message = "El Rol No se pudo crear!";
                _logger.LogError(error.Message);
            }

            return response; 
            


        }

        public async Task<ResponseHelper> EditarRol(Rol vm)
        {
            ResponseHelper response = new ResponseHelper();
            try
            {
                Rol modalRol = new Rol();

                modalRol = await _context.Roles.FindAsync(vm.PkRol);
                modalRol.Nombre = vm.Nombre;
                modalRol.Descripcion = vm.Descripcion;
                modalRol.IsDeleted = vm.IsDeleted;
                modalRol.RowVersion = vm.RowVersion;

                if (modalRol.PkRol == null || modalRol.PkRol == 0)
                {
                    response.Success = false;
                    response.Message = "No Se Ha Podido Actualizar Al Rol";
                }
                else
                {
                    _context.Roles.Update(modalRol);
                    await _context.SaveChangesAsync();
                    response.Success = true;
                    response.Message = "EL Rol Se Ah Actulizado Correctamente";
                }
            }
            catch (Exception error)
            {
                response.Success = false;
                response.Message = "Error al actualizar el Rol!";
                _logger.LogError(error.Message);
            }

            return response;
        }

        public async Task<ResponseHelper> EliminarRol(int? Id)
        {
            ResponseHelper response = new ResponseHelper();
            try
            {

                var usuarios = await (from consulta in _context.Usuario where consulta.FKRol == Id select consulta).ToListAsync();

                if (usuarios.Count() == 0 || usuarios == null)
                {
                    var modal = await _context.Roles.FindAsync(Id);
                    modal.IsDeleted = true;
                    _context.Roles.Update(modal);
                    await _context.SaveChangesAsync();

                    response.Success = true;
                    response.Message = "EL rol se ha eliminado correctamente!!!";
                }
                else
                {
                    response.Success = false;
                    response.Message = "Imposible eliminar el ROL por USUARIOS Asignados con ese rol!!! , ELimine los Usuarios o cambie el ROL a esos USUARIOS";
                }

                    
                
            }
            catch (Exception error)
            {
                response.Success = false;
                response.Message = "Error al actualizar el Rol!";
                _logger.LogError(error.Message);
            }
            return response;
        }

        public async Task<List<Rol>> ObtenerLista()
         {
            List<Rol> lista = new List<Rol>();
            try
            {
                lista = await _context.Roles.ToListAsync();
            }
            catch (Exception error)
            {
                _logger.LogError(error.Message);
            }
            return lista;
        }

        public async Task<Rol> ObtenerPorId(int? Id)
        {
            Rol modeloRol = new Rol();
            try
            {
                modeloRol = await _context.Roles.FindAsync(Id);


            }
            catch (Exception error)
            {
                _logger.LogError(error.Message);
            }
            return modeloRol;
        }
    }
}
