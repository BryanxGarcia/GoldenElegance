using GoldenEleganceProyecto.Models.Helpers;
using GoldenEleganceProyecto.Models;
using GoldenEleganceProyecto.Service.IServices;
using GoldenEleganceProyecto.Service.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GoldenEleganceProyecto.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsuariosController : ControllerBase
    {
        private readonly IUsuariosServicio _usuariosServicio;

        public UsuariosController(IUsuariosServicio usuariosServicio)
        {
            _usuariosServicio = usuariosServicio;
        }


        /// <summary>
        /// Metodo que nos sirve para obtener una lista de usuarios registrados en la base de datos.
        /// </summary>
        /// <returns>Lista de usuarios</returns>
        [HttpGet]
        [Route("usuarios")]
        public async Task<IActionResult> ObtenerLista()
        {
            var list = await _usuariosServicio.ObtenerLista();
            return Ok(list);
        }



        /// <summary>
        /// Metodo que nos sirve para obtener un usuario de acuerdo al Id proporcionado.
        /// </summary>
        /// <param name="Id"></param>
        /// <returns>producto</returns>
        [HttpGet]
        [Route("usuario/{Id}")]
        public async Task<IActionResult> ObtenerPorId(int? Id)
        {
            ResponseHelper response = new ResponseHelper();

            if (Id == null || Id == 0)
            {
                response.Success = false;
                response.Message = "No hay usuarios con ese Id";
                return BadRequest(response);
            }
            var modelo = await _usuariosServicio.ObtenerPorId(Id);
            return Ok(modelo);
        }

        /// <summary>
        /// Metodo que nos sirve para crear un nuevo usuario
        /// </summary>
        /// <param name="vmUsuarios"></param>
        /// <returns>ResponseHelper</returns>
        [HttpPost]
        [Route("crearUsuario")]
        public async Task<IActionResult> CrearUsuario(Usuarios vmUsuarios)
        {
            ResponseHelper response = await _usuariosServicio.CrearUsuario(vmUsuarios);
            if (!response.Success)
            {
                return BadRequest(response);
            }
            return Ok(response);
        }

        /// <summary>
        /// Metodo que nos sirve para editar un usuario existente en la base de datos.
        /// </summary>
        /// <param name="vmUsuarios"></param>
        /// <returns>ResponseHelper</returns>
        [HttpPost]
        [Route("actualizarUsuario")]
        public async Task<IActionResult> EditarUsuarios(Usuarios vmUsuarios)
        {
            ResponseHelper response = await _usuariosServicio.EditarUsuario(vmUsuarios);
            if (!response.Success)
            {
                return BadRequest(response);
            }
            return Ok(response);
        }

        /// <summary>
        /// Metodo que nos sirve para eliminar un usuario existente en la base de datos.
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

            response = await _usuariosServicio.EliminarUsuario(id);
            if (!response.Success)
            {
                return BadRequest(response);
            }
            return Ok(response);
        }
    }
}
