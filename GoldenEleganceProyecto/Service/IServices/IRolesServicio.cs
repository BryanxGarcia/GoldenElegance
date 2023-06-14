using GoldenEleganceProyecto.Models;
using GoldenEleganceProyecto.Models.Helpers;

namespace GoldenEleganceProyecto.Service.IServices
{
    public interface IRolesServicio
    {
        Task<List<Rol>> ObtenerLista();
        Task<Rol> ObtenerPorId(int? Id);
        Task<ResponseHelper> CrearRol(Rol vm);
        Task<ResponseHelper> EditarRol(Rol vm);
        Task<ResponseHelper> EliminarRol(int? Id);
    }
}
