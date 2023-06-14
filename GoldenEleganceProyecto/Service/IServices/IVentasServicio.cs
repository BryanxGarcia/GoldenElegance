using GoldenEleganceProyecto.Models;
using GoldenEleganceProyecto.Models.Helpers;

namespace GoldenEleganceProyecto.Service.IServices
{
    public interface IVentasServicio
    {
        Task<List<Venta>> ObtenerLista();
        Task<Venta> ObtenerPorId(int? Id);
        Task<ResponseHelper> CrearVenta(Venta vm);
        Task<ResponseHelper> EditarVenta(Venta vm);
        Task<ResponseHelper> EliminarVenta(int? Id);
    }
}
