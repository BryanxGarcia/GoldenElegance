using GoldenEleganceProyecto.Models;
using GoldenEleganceProyecto.Models.Helpers;
using GoldenEleganceProyecto.Service.IServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography.Xml;

namespace GoldenEleganceProyecto.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RolesController : ControllerBase
    {
        private readonly IRolesServicio _rolesServicio;

        public RolesController(IRolesServicio rolesServicio)
        {
            _rolesServicio = rolesServicio;

        }

        
        /// <summary>
        /// Metodo que nos sirve para obtener una lista de los roles registradas en la base de datos.
        /// </summary>
        /// <returns>Lista de roles</returns>
        [HttpGet]
        [Route("roles")]
        public async Task<IActionResult> ObtenerLista()
        {
            var list = await _rolesServicio.ObtenerLista();
            return Ok(list);
        }


   
        /// <summary>
        /// Metodo que nos sirve para obtener un rol de acuerdo al Id proporcionado.
        /// </summary>
        /// <param name="Id"></param>
        /// <returns>Rol</returns>
        [HttpGet]
        [Route("roles/{Id}")]
        public async Task<IActionResult> ObtenerPorId(int? Id)
        {
            ResponseHelper response = new ResponseHelper();

            if (Id == null || Id == 0)
            {
                response.Success = false;
                response.Message = "No hay roles con ese Id";
                return BadRequest(response);
            }
            var modelo = await _rolesServicio.ObtenerPorId(Id);
            return Ok(modelo);
        }

        /// <summary>
        /// Metodo que nos sirve para crear un nuevo rol
        /// </summary>
        /// <param name="vmRol"></param>
        /// <returns>ResponseHelper</returns>
        [HttpPost]
        [Route("crearRol")]
        public async Task<IActionResult> CrearRol(Rol vmRol)
        {
            ResponseHelper response = await _rolesServicio.CrearRol(vmRol);
            if (!response.Success)
            {
                return BadRequest(response);
            }
            return Ok(response);
        }

        /// <summary>
        /// Metodo que nos sirve para editar un rol existente en la base de datos.
        /// </summary>
        /// <param name="vmRol"></param>
        /// <returns>ResponseHelper</returns>
        [HttpPost]
        [Route("actualizar")]
        public async Task<IActionResult> EditarRol(Rol vmRol)
        {
            ResponseHelper response = await _rolesServicio.EditarRol(vmRol);
            if (!response.Success)
            {
                return BadRequest(response);
            }
            return Ok(response);
        }

        /// <summary>
        /// Metodo que nos sirve para eliminar un rol existente en la base de datos.
        /// </summary>
        /// <param name="id"></param>
        /// <returns>ResponseHelper</returns>
        [HttpDelete]
        [Route("eliminar/{id}")]
        public async Task<IActionResult> Eliminar(int? id)
        {
            ResponseHelper response = new ResponseHelper();
            if (id == null || id == 0)
            {
                response.Success = false;
                response.Message = "No se encontro el Id correspondiente";
                return BadRequest(response);
            }

            response = await _rolesServicio.EliminarRol(id);
            if (!response.Success)
            {
                return BadRequest(response);
            }
            return Ok(response);
        }

        ///// <summary>
        ///// Método que permite obtener el excel de asignaturas y unidades tematicas
        ///// </summary>
        ///// <returns></returns>
        //[HttpGet]
        //[AllowAnonymous]
        //[Route("DescargarExcel")]
        //public IActionResult ArchivoCarga()
        //{
        //    var path = Path.GetFullPath("wwwroot/Documentos/ExcelDescargas/Asignaturas-UnidadesTematicas.xlsx");
        //    var stream = new FileStream(path, FileMode.Open);
        //    return new FileStreamResult(stream, "application/octet-stream") { FileDownloadName = "Asignaturas-UnidadesTematicas.xlsx" };
        //}
        ///// <summary>
        ///// Método que permite realizar la carga masiva de las asignaturas de la plataforma
        ///// </summary>
        ///// <param name="excel"></param>
        ///// <param name="connectionId"></param>
        ///// <returns></returns>
        //[HttpPost]
        //[Route("CargaMasiva")]
        //public async Task<IActionResult> CargaMasivaAsignaturaUnidades([FromForm] string connectionId, IFormFile excel)
        //{
        //    ResponseHelper response = new ResponseHelper();
        //    response = await _asignaturaServicio.CargaMasiva(excel, connectionId);

        //    return Ok(response);
        //}
        //[HttpPost]
        //[Route("AsignaturasApi")]
        //public async Task<IActionResult> AsignaturasAPIs(List<AsignaturaAPI> datos)
        //{
        //    ResponseHelper response = new ResponseHelper();
        //    response = await _asignaturaServicio.AsignaturaAPIs(datos);
        //    return Ok(response);
        //}



    }
}
