using GoldenEleganceProyecto.Models;
using GoldenEleganceProyecto.Models.Helpers;

namespace GoldenEleganceProyecto.Service.IServices
{
    public interface IFavoritosServicio
    {
        Task<List<Favoritos>> ObtenerLista(int? Id);
        Task<ResponseHelper> AgregarFavorito(Favoritos vm);
        Task<ResponseHelper> EliminarFavorito(int? Id);
    }
}
