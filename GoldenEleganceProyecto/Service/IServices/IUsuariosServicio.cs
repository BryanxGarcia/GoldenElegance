
using GoldenEleganceProyecto.Models;
using GoldenEleganceProyecto.Models.Helpers;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.Xml;
using System.Text;
using System.Threading.Tasks;

namespace GoldenEleganceProyecto.Service.IServices
{
    public interface IUsuariosServicio
    {
        Task<List<Usuarios>> ObtenerLista();
        Task<Usuarios> ObtenerPorId(int? Id);
        Task<ResponseHelper> CrearUsuario(Usuarios vm);
        Task<ResponseHelper> EditarUsuario(Usuarios vm);
        Task<ResponseHelper> EliminarUsuario(int? Id);
        Task<bool> ExisteUsuario(Usuarios asignatura);
        Task<bool> ExisteUsuarioPorId(int? Id);

        //Task<ResponseHelper> CargaMasiva(IFormFile excel, string connectionId);
    }
}
