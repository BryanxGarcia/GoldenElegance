using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GoldenEleganceProyecto.Models
{
    public class Venta
    {
        [Key]
        public int PkVenta { get; set; }

        [ForeignKey("Usuario")]
        public int FKUsuario { get; set; }
        public Usuarios Usuario { get; set; }

  
        [ForeignKey("Producto")]
        public int FKProducto { get; set; }
        public Productos Producto { get; set; }


        public int Precio { get; set; }
        public DateTime FechaVenta { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime? RowVersion { get; set; }

    }
}
