export interface IProductos{
    pkProducto:number,
    nombreProducto: string,
    descripcion: string,
    fkCategoria: number,
    precioVenta: number,
    inventario: number,
    imagen: string,
    cantidad?: number;
    precioCantidad?: number;
}