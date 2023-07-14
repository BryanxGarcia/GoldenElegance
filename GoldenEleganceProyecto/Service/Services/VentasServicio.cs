using GoldenEleganceProyecto.Context;
using GoldenEleganceProyecto.Models;
using GoldenEleganceProyecto.Models.Helpers;
using GoldenEleganceProyecto.Service.IServices;
using Microsoft.EntityFrameworkCore;

namespace GoldenEleganceProyecto.Service.Services
{
    public class VentasServicio : IVentasServicio
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger _logger;
        public VentasServicio(ApplicationDbContext context, ILogger<Usuarios> logger)
        {
            _logger = logger;
            _context = context;

        }

        public async Task<ResponseHelper> CrearVenta(Venta venta)
        {
            ResponseHelper response = new();

            await _context.Ventas.AddAsync(venta);
            await _context.SaveChangesAsync();

            response.Message = "EL producto se ha agregado a ventas";
            response.Success = true;

            return response;
        }

        public async Task<ResponseHelper> CrearVentasMasiva(List<Productos> productos, string username)
        {
            ResponseHelper response = new();
            var usuario = await _context.Usuario.Where(x => x.Username == username).FirstOrDefaultAsync();

            foreach (var producto in productos)
            {
                Venta venta = new()
                {
                    FKProducto = producto.PkProducto,
                    FKUsuario = usuario.PkUsuario,
                    Precio = producto.PrecioVenta,
                    FechaVenta = DateTime.Now,
                    IsDeleted = false,
                    RowVersion = DateTime.Now
                };

                await CrearVenta(venta);
            }

            response.Message = "Se agregaron a ventas";
            response.Success = true;

            return response;
            
        }

        public Task<ResponseHelper> EditarVenta(Venta vm)
        {
            throw new NotImplementedException();
        }

        public Task<ResponseHelper> EliminarVenta(int? Id)
        {
            throw new NotImplementedException();
        }

        public async Task<List<Venta>> ObtenerLista()
        {
            List<Venta> lista = new();

            lista = await _context.Ventas.ToListAsync();
            return lista;
        }

        public Task<Venta> ObtenerPorId(int? Id)
        {
            throw new NotImplementedException();
        }
    }
}
