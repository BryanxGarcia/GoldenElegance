using GoldenEleganceProyecto.Context;
using GoldenEleganceProyecto.Models;
using GoldenEleganceProyecto.Models.Helpers;
using GoldenEleganceProyecto.Service.IServices;
using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Ocsp;

namespace GoldenEleganceProyecto.Service.Services
{
    public class ProductosServicio : IProductosServicio
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger _logger;
        public ProductosServicio(ApplicationDbContext context, ILogger<Usuarios> logger)
        {
            _logger = logger;
            _context = context;

        }

        public async Task<ResponseHelper> CrearProducto(Productos producto)
        {

            try
            {
                if (producto == null)
                    return new ResponseHelper { Success = false, Message = "Necesitas rellenar los campos solicitados" };
                Productos productoA = new Productos();            
                productoA.NombreProducto = producto.NombreProducto;
                productoA.Descripcion = producto.Descripcion;
                productoA.Inventario = producto.Inventario;
                productoA.PrecioVenta = producto.PrecioVenta;
                productoA.FKCategoria = producto.FKCategoria;
                productoA.Imagen = producto.Imagen;
                productoA.RowVersion = DateTime.Now;
                productoA.IsDeleted = false;
              
                var resp = await _context.Productos.AddAsync(productoA);
                var respu = await _context.SaveChangesAsync();
                if (resp != null && respu > 0)
                {
                    return new ResponseHelper { Success = true, Message = "El producto fue creado correctamente" };

                }
                else
                {
                    return new ResponseHelper { Success = false, Message = "El producto no fue creado correctamente" };

                }
            }
            catch (Exception ex)
            {
                return new ResponseHelper { Success = false, Message = ex.Message };


            }
        }

        public async Task<ResponseHelper> EditarProducto(Productos producto)
        {
            try
            {
                if (producto == null)
                    return new ResponseHelper { Success = false, Message = "Necesitas rellenar los campos solicitados" };

                Productos productoA = new Productos();
                productoA = await _context.Productos.FirstOrDefaultAsync(x => x.PkProducto == producto.PkProducto);
                productoA.NombreProducto = producto.NombreProducto;
                productoA.Descripcion = producto.Descripcion;
                productoA.Inventario = producto.Inventario;
                productoA.PrecioVenta = producto.PrecioVenta;
                productoA.FKCategoria = producto.FKCategoria;
                productoA.Imagen = producto.Imagen;
                productoA.RowVersion = DateTime.Now;

                var resp = _context.Productos.Update(productoA);
                var respu = await _context.SaveChangesAsync();

                if (resp != null && respu > 0)
                {
                    return new ResponseHelper { Success = true, Message = "El producto se edito correctamente" };

                }
                else
                {
                    return new ResponseHelper { Success = false, Message = "El producto no se aplicaron los cambios" };

                }
            }
            catch (Exception ex)
            {
                return new ResponseHelper { Success = false, Message = ex.Message };


            }
        }

        public async Task<ResponseHelper> EliminarProducto(int? Id)
        {
            Productos producto = new Productos();
            producto = await _context.Productos.FirstOrDefaultAsync(x => x.PkProducto == Id);

            var resp = _context.Productos.Remove(producto);
            var respu = await _context.SaveChangesAsync();

            if (resp != null && respu > 0)
            {
                return new ResponseHelper { Success = true, Message = "El producto fue eliminado correctamente" };

            }
            else
            {
                return new ResponseHelper { Success = false, Message = "El producto no fue eliminado" };

            }

        }

        public async Task<List<Productos>> ObtenerLista()
        {
            List<Productos> lista = new List<Productos>();

            lista = await _context.Productos.Include(u => u.Categoria).ToListAsync();
            return lista;
        }

        public async Task<Productos> ObtenerPorId(int? Id)
        {
            Productos producto = new Productos();

            producto = await _context.Productos.FirstOrDefaultAsync(x => x.PkProducto == Id);
            return producto;
        }
    }
}
