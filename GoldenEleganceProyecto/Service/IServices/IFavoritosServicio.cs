using GoldenEleganceProyecto.Models;
using GoldenEleganceProyecto.Models.Helpers;

namespace GoldenEleganceProyecto.Service.IServices
{
    public interface IFavoritosServicio
    {
        Task<List<Productos>> ObtenerLista(string Username);
        Task<ResponseHelper> ExisteEnFavoritos(FavoritosDTO favoritoDTO);

        Task<ResponseHelper> AgregarFavorito(FavoritosDTO favoritoDTO);
        Task<ResponseHelper> EliminarFavorito(FavoritosDTO favoritos);
    }
}
