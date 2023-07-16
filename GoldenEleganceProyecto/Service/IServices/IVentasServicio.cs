using GoldenEleganceProyecto.Models;
using GoldenEleganceProyecto.Models.Helpers;

namespace GoldenEleganceProyecto.Service.IServices
{
    public interface IVentasServicio
    {
        Task<List<Venta>> ObtenerLista();
        Task<List<Venta>> ObtenerPorId(string username);
        Task<ResponseHelper> CrearVenta(Venta vm);
        Task<ResponseHelper> CrearVentasMasiva(List<Productos> productos, string username);
    }
}
