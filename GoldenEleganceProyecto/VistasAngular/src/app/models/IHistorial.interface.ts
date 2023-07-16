import { IProductos } from "./IProductos.interface.";

export interface IHistorial {
    pkVenta: number;
    fKUsuario: number;
    fKProducto: number;
    producto : IProductos; 
    precio: number;
    fechaVenta: string;
}