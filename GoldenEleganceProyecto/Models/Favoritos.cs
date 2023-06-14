using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace GoldenEleganceProyecto.Models
{
    public class Favoritos
    {
        [Key]
        public int PkFavorito { get; set; }

        [ForeignKey("Usuario")]
        public int FKUsuario { get; set; }
        public Usuarios Usuario { get; set; }

        [ForeignKey("Producto")]
        public int FKProducto { get; set; }
        public Productos Producto { get; set; }
        public DateTime FechaAgrego { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime? RowVersion { get; set; }
    }
}
