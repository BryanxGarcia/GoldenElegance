using GoldenEleganceProyecto.Models.Helpers;
using GoldenEleganceProyecto.Models;
using GoldenEleganceProyecto.Service.IServices;
using GoldenEleganceProyecto.Service.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace GoldenEleganceProyecto.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VentasController : ControllerBase
    {
        private readonly IVentasServicio _ventasServicio;

        public VentasController(IVentasServicio ventasServicio)
        {
            _ventasServicio = ventasServicio;

        }

        /// <summary>
        /// Metodo que nos sirve para obtener una lista de las ventas registradas en la base de datos.
        /// </summary>
        /// <returns>Lista de ventas</returns>
        [HttpGet]
        [Route("ventas")]
        public async Task<IActionResult> ObtenerLista()
        {
            var list = await _ventasServicio.ObtenerLista();
            return Ok(list);
        }

        /// <summary>
        /// Metodo que nos sirve para obtener una lista de las ventas registradas en la base de datos de acuerdo a un usuario.
        /// </summary>
        /// <returns>Lista de ventas</returns>
        [HttpGet]
        [Route("historial/{username}")]
        public async Task<IActionResult> ObtenerListaPorUsuario(string username)
        {
            var list = await _ventasServicio.ObtenerPorId(username);

            return Ok(list);
        }

        /// <summary>
        /// Metodo que nos sirve para crear una nueva venta
        /// </summary>
        /// <param name="vmProducto"></param>
        /// <returns>ResponseHelper</returns>
        [HttpPost]
        [Route("crearVentasMasivas")]
        public async Task<IActionResult> CrearVentas([FromBody] VentasDTO ventasDTO)
        {
            ResponseHelper response = await _ventasServicio.CrearVentasMasiva(ventasDTO.Productos, ventasDTO.Username);
            if (!response.Success)
            {
                return BadRequest(response);
            }
            return Ok(response);
        }

    }
}
