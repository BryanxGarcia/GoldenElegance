using GoldenEleganceProyecto.Models;
using GoldenEleganceProyecto.Models.Helpers;

namespace GoldenEleganceProyecto.Service.IServices
{
    public interface ICategoriasServicio
    {
        Task<List<Categoria>> ObtenerLista();
        Task<Categoria> ObtenerPorId(int? Id);
        Task<ResponseHelper> CrearCategoria(Categoria vm);
        Task<ResponseHelper> EditarCategoria(Categoria vm);
        Task<ResponseHelper> EliminarCategoria(int? Id);
    }
}
