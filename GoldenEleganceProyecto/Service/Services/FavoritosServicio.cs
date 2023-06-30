using GoldenEleganceProyecto.Context;
using GoldenEleganceProyecto.Models;
using GoldenEleganceProyecto.Models.Helpers;
using GoldenEleganceProyecto.Service.IServices;
using Microsoft.EntityFrameworkCore;

namespace GoldenEleganceProyecto.Service.Services
{
    

    public class FavoritosServicio : IFavoritosServicio
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger _logger;
        public FavoritosServicio(ApplicationDbContext context, ILogger<Favoritos> logger)
        {
            _logger = logger;
            _context = context;
        }
        //Agrega Un Producto A favoritos del Usuario
        public async Task<ResponseHelper> AgregarFavorito(Favoritos vm)
        {
            ResponseHelper response = new ResponseHelper();
            try
            {
                if (vm.FKUsuario > 0) {

                    if (vm.FKProducto > 0) {
                        await _context.AddAsync(vm);
                        await _context.SaveChangesAsync();

                        response.Message = "EL producto se ha agregado a favoritos";
                        response.Success = true;

                    }
                    else {
                        response.Message = "No se ha podido insertar el Id del producto";
                        response.Success = false;
                    }
                }
                else
                {
                    response.Message = "No se ha podido insertar el Id del usuario";
                    response.Success = false;
                }

            }
            catch (Exception error)
            {

                response.Message = "Error al momento de agregar a favoritos";
                response.Success = false;
                _logger.LogError(error.Message);
            }
            return response;
        }
        //Elimina EL producto de favoritos del Usuario
        public async Task<ResponseHelper> EliminarFavorito(int? Id)
        {
            ResponseHelper response = new ResponseHelper();
            try
            {
                if ( Id > 0)
                {
                    Favoritos modeloFavorito = new Favoritos();
                    modeloFavorito = await _context.Favoritos.FindAsync(Id);
                     _context.Favoritos.Remove(modeloFavorito);
                    await _context.SaveChangesAsync();

                    response.Message = "Producto Eliminado de Favoritos";
                    response.Success = true;
                }else
                {
                    response.Message = "El Id de producto no recibido o no identidicado";
                    response.Success = false;
                }
                
            }
            catch (Exception error)
            {
                response.Message = "Error al momento de eliminar de favoritos";
                response.Success = false;
                _logger.LogError(error.Message);
            }
            return response;
        }
        //En Lista Los Productos favoritos de un usuario
        public async Task<List<Favoritos>> ObtenerLista(int? Id)
        {
            List<Favoritos> lista = new List<Favoritos>();
            try
            {
                 lista = (from consulta in _context.Favoritos where consulta.FKUsuario == Id select consulta).Include(x=> x.Producto).ToList();
            }
            catch (Exception error)
            {
                _logger.LogError(error.Message);
            }

            return  lista;
        }
    }
}
