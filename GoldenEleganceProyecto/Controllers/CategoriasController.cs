using GoldenEleganceProyecto.Models.Helpers;
using GoldenEleganceProyecto.Models;
using GoldenEleganceProyecto.Service.IServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GoldenEleganceProyecto.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class CategoriasController : ControllerBase
    {

        private readonly ICategoriasServicio _categoriasServicio;

        public CategoriasController(ICategoriasServicio categoriasServicio)
        {
            _categoriasServicio = categoriasServicio;

        }


        /// <summary>
        /// Metodo que nos sirve para obtener una lista de las categorias registradas en la base de datos.
        /// </summary>
        /// <returns>Lista de categorias</returns>
        [HttpGet]
        [Route("categorias")]
        public async Task<IActionResult> ObtenerLista()
        {
            var list = await _categoriasServicio.ObtenerLista();
            return Ok(list);
        }



        /// <summary>
        /// Metodo que nos sirve para obtener una categoria de acuerdo al Id proporcionado.
        /// </summary>
        /// <param name="Id"></param>
        /// <returns>producto</returns>
        [HttpGet]
        [Route("categoria/{Id}")]
        public async Task<IActionResult> ObtenerPorId(int? Id)
        {
            ResponseHelper response = new ResponseHelper();

            if (Id == null || Id == 0)
            {
                response.Success = false;
                response.Message = "No hay categorias con ese Id";
                return BadRequest(response);
            }
            var modelo = await _categoriasServicio.ObtenerPorId(Id);
            return Ok(modelo);
        }

        /// <summary>
        /// Metodo que nos sirve para crear una nueva categoria
        /// </summary>
        /// <param name="vmCategoria"></param>
        /// <returns>ResponseHelper</returns>
        [HttpPost]
        [Route("crearCategoria")]
        public async Task<IActionResult> CrearProducto(Categoria vmCategoria)
        {
            ResponseHelper response = await _categoriasServicio.CrearCategoria(vmCategoria);
            if (!response.Success)
            {
                return BadRequest(response);
            }
            return Ok(response);
        }

        /// <summary>
        /// Metodo que nos sirve para editar una categoria existente en la base de datos.
        /// </summary>
        /// <param name="vmCategoria"></param>
        /// <returns>ResponseHelper</returns>
        [HttpPost]
        [Route("actualizarCategoria")]
        public async Task<IActionResult> EditarCategoria(Categoria vmCategoria)
        {
            ResponseHelper response = await _categoriasServicio.EditarCategoria(vmCategoria);
            if (!response.Success)
            {
                return BadRequest(response);
            }
            return Ok(response);
        }

        /// <summary>
        /// Metodo que nos sirve para eliminar una categoria existente en la base de datos.
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

            response = await _categoriasServicio.EliminarCategoria(id);
            if (!response.Success)
            {
                return BadRequest(response);
            }
            return Ok(response);
        }
    }
}
