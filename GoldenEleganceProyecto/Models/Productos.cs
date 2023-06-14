using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GoldenEleganceProyecto.Models
{
    public class Productos
    {
        [Key]
        public int PkProducto { get; set; }
        public string NombreProducto { get; set; }
        public string Descripcion { get; set; }

        [ForeignKey("Categoria")]
        public int FKCategoria { get; set; }
        public Categoria Categoria { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime? RowVersion { get; set; }
        public int PrecioVenta { get; set; }
        public int Inventario { get; set; }
        public string Imagen { get; set;}

    }
}
