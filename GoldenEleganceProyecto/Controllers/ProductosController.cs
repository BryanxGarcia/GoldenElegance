using GoldenEleganceProyecto.Context;
using GoldenEleganceProyecto.Models;
using GoldenEleganceProyecto.Service.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using GoldenEleganceProyecto.Service.IServices;
using System.Collections.Generic;
using GoldenEleganceProyecto.Models.Helpers;
using Microsoft.AspNetCore.Authorization;

namespace GoldenEleganceProyecto.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductosController : ControllerBase
    {

        private readonly IProductosServicio _productosServicio;

        public ProductosController(IProductosServicio productosServicio)
        {
            _productosServicio = productosServicio;

        }


        /// <summary>
        /// Metodo que nos sirve para obtener una lista de productos registrados en la base de datos.
        /// </summary>
        /// <returns>Lista de productos</returns>
        [HttpGet]
        [Route("productos")]
        public async Task<IActionResult> ObtenerLista()
        {
            var list = await _productosServicio.ObtenerLista();
            return Ok(list);
        }



        /// <summary>
        /// Metodo que nos sirve para obtener un producto de acuerdo al Id proporcionado.
        /// </summary>
        /// <param name="Id"></param>
        /// <returns>producto</returns>
        [HttpGet]
        [Route("producto/{Id}")]
        public async Task<IActionResult> ObtenerPorId(int? Id)
        {
            ResponseHelper response = new ResponseHelper();

            if (Id == null || Id == 0)
            {
                response.Success = false;
                response.Message = "No hay producto con ese Id";
                return BadRequest(response);
            }
            var modelo = await _productosServicio.ObtenerPorId(Id);
            return Ok(modelo);
        }

        /// <summary>
        /// Metodo que nos sirve para crear un nuevo producto
        /// </summary>
        /// <param name="vmProducto"></param>
        /// <returns>ResponseHelper</returns>
        [HttpPost]
        [Route("crearProducto")]
        public async Task<IActionResult> CrearProducto(Productos vmProducto)
        {
            ResponseHelper response = await _productosServicio.CrearProducto(vmProducto);
            if (!response.Success)
            {
                return BadRequest(response);
            }
            return Ok(response);
        }

        /// <summary>
        /// Metodo que nos sirve para editar un producto existente en la base de datos.
        /// </summary>
        /// <param name="vmProducto"></param>
        /// <returns>ResponseHelper</returns>
        [HttpPost]
        [Route("actualizarProducto")]
        public async Task<IActionResult> EditarProducto(Productos vmProducto)
        {
            ResponseHelper response = await _productosServicio.EditarProducto(vmProducto);
            if (!response.Success)
            {
                return BadRequest(response);
            }
            return Ok(response);
        }

        /// <summary>
        /// Metodo que nos sirve para eliminar un producto existente en la base de datos.
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

            response = await _productosServicio.EliminarProducto(id);
            if (!response.Success)
            {
                return BadRequest(response);
            }
            return Ok(response);
        }





    }
}
