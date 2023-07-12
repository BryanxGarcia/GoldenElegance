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
        /// Metodo que nos sirve para obtener una lista de los favoritos por usuario registradas en la base de datos.
        /// </summary>
        /// <returns>Lista de Favoritos</returns>
        [HttpGet]
        [Route("favoritos/{Username}")]
        public async Task<IActionResult> ObtenerListaPorUsuario(FavoritosDTO favoritoDTO)
        {
            ResponseHelper response = new ResponseHelper();

            if (favoritoDTO.Usuario == null)
            {
                response.Success = false;
                response.Message = "No hay Usuario con ese Id";
                return BadRequest(response);
            }
            var modelo = await _FavoritosServicio.ObtenerLista(favoritoDTO.Usuario);
            return Ok(modelo);
        }
        /// <summary>
        /// Metodo que nos sirve para obtener una lista de los roles registradas en la base de datos.
        /// </summary>
        /// <returns>Lista de Favoritos</returns>
        [HttpPost]
        [Route("existeFavorito")]
        public async Task<IActionResult> ExisteEnFavoritos(FavoritosDTO favoritoDTO)
        {
            ResponseHelper response = new ResponseHelper();

            if (favoritoDTO == null)
            {
                response.Success = false;
                response.Message = "No se proporciono niguna busqueda";
                return BadRequest(response);
            }
            var modelo = await _FavoritosServicio.ExisteEnFavoritos(favoritoDTO);
            return Ok(modelo);
        }
        /// <summary>
        /// Metodo que nos sirve para crear un nuevo rol
        /// </summary>
        /// <param name="vmFavorito"></param>
        /// <returns>ResponseHelper</returns>
        [HttpPost]
        [Route("agregar")]
        public async Task<IActionResult> AgregarFavorito(FavoritosDTO favoritoDTO)
        {
            ResponseHelper response = await _FavoritosServicio.AgregarFavorito(favoritoDTO);
            if (!response.Success)
            {
                return BadRequest(response);
            }
            return Ok(response);
        }

        [HttpDelete]
        [Route("eliminar")]
        public async Task<IActionResult> Eliminar([FromBody] FavoritosDTO favoritoDTO)
        {
            ResponseHelper response = new ResponseHelper();
            if (favoritoDTO == null)
            {
                response.Success = false;
                response.Message = "No se encontro el Id correspondiente";
                return BadRequest(response);
            }

            response = await _FavoritosServicio.EliminarFavorito(favoritoDTO);
            if (!response.Success)
            {
                return BadRequest(response);
            }
            return Ok(response);
        }
    }
}
