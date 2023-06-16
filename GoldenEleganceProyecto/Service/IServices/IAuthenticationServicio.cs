using GoldenEleganceProyecto.Models;
using GoldenEleganceProyecto.Models.Helpers;

namespace GoldenEleganceProyecto.Service.IServices
{
    public interface IAuthenticationServicio
    {
        
        Task<Usuarios> ObtenerUsuario(int? Id);
        Task<ResponseHelper> RegistrarUsuario(Usuarios usuario);

        Task<IResponseToken> LoginUsuario(Usuarios usuario);

        Task<ResponseHelper> ResetPassword(string correo);

    }
}
