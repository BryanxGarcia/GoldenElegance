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
        public async Task<ResponseHelper> AgregarFavorito(FavoritosDTO favoritoDTO)
        {
            ResponseHelper response = new ResponseHelper();
            try
            {
                var usuario = await _context.Usuario.Where(x => x.Username == favoritoDTO.Usuario).FirstOrDefaultAsync();

                if (usuario.PkUsuario > 0) {

                    if (favoritoDTO.FkProducto > 0) {
                        Favoritos fav = new();
                        fav.FKProducto = favoritoDTO.FkProducto;
                        fav.FKUsuario = usuario.PkUsuario;
                        fav.IsDeleted = false;
                        fav.RowVersion = DateTime.Now;


                        await _context.Favoritos.AddAsync(fav);
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
        public async Task<ResponseHelper> EliminarFavorito(FavoritosDTO favoritoDTO)
        {
            ResponseHelper response = new();
            try
            {
                var usuario = await _context.Usuario.Where(x => x.Username == favoritoDTO.Usuario).FirstOrDefaultAsync();

                if ( favoritoDTO.FkProducto > 0 && usuario.PkUsuario>0)
                {
                    Favoritos modeloFavorito = new();

                    modeloFavorito = await _context.Favoritos.Where(x => x.FKProducto == favoritoDTO.FkProducto && x.FKUsuario == usuario.PkUsuario).FirstOrDefaultAsync();
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
        public async Task<List<Productos>> ObtenerLista(string Username)
        {
            List<Productos> lista = new();
            try
            {
                var usuario = await _context.Usuario.Where(x => x.Username == Username).FirstOrDefaultAsync();

                var favoritos = await _context.Favoritos.Where(x => x.FKUsuario == usuario.PkUsuario).ToListAsync();
                
                foreach (var favorito in favoritos) {

                    var producto = await _context.Productos.Where(x => x.PkProducto == favorito.FKProducto).FirstOrDefaultAsync();

                    lista.Add(producto);
                }
            }
            catch (Exception error)
            {
                _logger.LogError(error.Message);
            }

            return  lista;
        }

        public async Task<ResponseHelper> ExisteEnFavoritos(FavoritosDTO favoritoDTO)
        {
            ResponseHelper response = new();
            try
            {
                var usuario = await _context.Usuario.Where(x=> x.Username == favoritoDTO.Usuario).FirstOrDefaultAsync();
                var respuesta = await _context.Favoritos.AnyAsync(u => u.FKProducto == favoritoDTO.FkProducto && u.FKUsuario == usuario.PkUsuario);
                if (respuesta)
                {
                    response.Success = true;
                    response.Message = "Si existe favorito";
                }
                else
                {
                    response.Success = false;
                    response.Message = "No existe ese favorito";

                }
            }
            catch (Exception error)
            {
                _logger.LogError(error.Message);
            }

            return response;
        }
    }
}
