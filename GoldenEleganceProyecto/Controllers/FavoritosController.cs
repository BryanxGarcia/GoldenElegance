using GoldenEleganceProyecto.Models;
using GoldenEleganceProyecto.Models.Helpers;
using GoldenEleganceProyecto.Service.IServices;
using Microsoft.AspNetCore.Mvc;

namespace GoldenEleganceProyecto.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FavoritosController : ControllerBase
    {
        private readonly IFavoritosServicio _FavoritosServicio;

        public FavoritosController(IFavoritosServicio iFavoritosServicio)
        {
            _FavoritosServicio = iFavoritosServicio;
        }

        /// <summary>
        /// Metodo que nos sirve para obtener una lista de los roles registradas en la base de datos.
        /// </summary>
        /// <returns>Lista de Favoritos</returns>
        [HttpGet]
        [Route("favoritos/{Id}")]
        public async Task<IActionResult> ObtenerPorId(int? Id)
        {
            ResponseHelper response = new ResponseHelper();

            if (Id == null || Id == 0)
            {
                response.Success = false;
                response.Message = "No hay Usuario con ese Id";
                return BadRequest(response);
            }
            var modelo = await _FavoritosServicio.ObtenerLista(Id);
            return Ok(modelo);
        }

        /// <summary>
        /// Metodo que nos sirve para crear un nuevo rol
        /// </summary>
        /// <param name="vmFavorito"></param>
        /// <returns>ResponseHelper</returns>
        [HttpPost]
        [Route("agregar")]
        public async Task<IActionResult> AgregarFavorito(Favoritos vmFavorito)
        {
            ResponseHelper response = await _FavoritosServicio.AgregarFavorito(vmFavorito);
            if (!response.Success)
            {
                return BadRequest(response);
            }
            return Ok(response);
        }

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

            response = await _FavoritosServicio.EliminarFavorito(id);
            if (!response.Success)
            {
                return BadRequest(response);
            }
            return Ok(response);
        }
    }
}
