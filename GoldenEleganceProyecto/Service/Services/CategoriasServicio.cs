using GoldenEleganceProyecto.Context;
using GoldenEleganceProyecto.Models;
using GoldenEleganceProyecto.Models.Helpers;
using GoldenEleganceProyecto.Service.IServices;
using Microsoft.EntityFrameworkCore;

namespace GoldenEleganceProyecto.Service.Services
{
    public class CategoriasServicio : ICategoriasServicio
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger _logger;
        public CategoriasServicio(ApplicationDbContext context, ILogger<Usuarios> logger)
        {
            _logger = logger;
            _context = context;

        }

        public async Task<ResponseHelper> CrearCategoria(Categoria categoria)
        {
            try
            {
                if (categoria == null)
                    return new ResponseHelper { Success = false, Message = "Necesitas rellenar los campos solicitados" };

                categoria.RowVersion = DateTime.Now;
                categoria.IsDeleted = false;

                var resp = await _context.Categorias.AddAsync(categoria);
                var respu = await _context.SaveChangesAsync();
                if (resp != null && respu > 0)
                {
                    return new ResponseHelper { Success = true, Message = "La categoria fue creado correctamente" };

                }
                else
                {
                    return new ResponseHelper { Success = false, Message = "La categoria no fue creado correctamente" };

                }
            }
            catch (Exception ex)
            {
                return new ResponseHelper { Success = false, Message = ex.Message };


            }
        }

        public async Task<ResponseHelper> EditarCategoria(Categoria categoria)
        {
            try
            {
                if (categoria == null)
                    return new ResponseHelper { Success = false, Message = "Necesitas rellenar los campos solicitados" };

                Categoria CatAnadir = new Categoria();
                CatAnadir = await _context.Categorias.FirstOrDefaultAsync(x => x.PkCategoria == categoria.PkCategoria);
                CatAnadir.NombreCat = categoria.NombreCat;
                CatAnadir.Descripcion = categoria.Descripcion;
                CatAnadir.RowVersion = DateTime.Now;

                var resp = _context.Categorias.Update(CatAnadir);
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

        public async Task<ResponseHelper> EliminarCategoria(int? Id)
        {
            Categoria categoria = new Categoria();
            categoria = await _context.Categorias.FirstOrDefaultAsync(x => x.PkCategoria == Id);

            var resp = _context.Categorias.Remove(categoria);
            var respu = await _context.SaveChangesAsync();

            if (resp != null && respu > 0)
            {
                return new ResponseHelper { Success = true, Message = "La categoria fue eliminada correctamente" };

            }
            else
            {
                return new ResponseHelper { Success = false, Message = "La categoria no pudo ser eliminada" };

            }
        }

        public async Task<List<Categoria>> ObtenerLista()
        {
            List<Categoria> Cat = await _context.Categorias.ToListAsync();
            return Cat;
        }

        public async Task<Categoria> ObtenerPorId(int? Id)
        {
            Categoria categoria = new();

            categoria = await _context.Categorias.FirstOrDefaultAsync(x => x.PkCategoria == Id);
            return categoria;
        }
    }
}
