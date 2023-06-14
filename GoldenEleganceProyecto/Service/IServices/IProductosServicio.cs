using GoldenEleganceProyecto.Models;
using GoldenEleganceProyecto.Models.Helpers;

namespace GoldenEleganceProyecto.Service.IServices
{
    public interface IProductosServicio
    {
        Task<List<Productos>> ObtenerLista();
        Task<Productos> ObtenerPorId(int? Id);
        Task<ResponseHelper> CrearProducto(Productos vm);
        Task<ResponseHelper> EditarProducto(Productos vm);
        Task<ResponseHelper> EliminarProducto(int? Id);
    }
}
