import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProductos } from 'src/app/models/IProductos.interface.';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private baseUrl: string = environment.serverUrl;
  private controller = '/api/Ventas';

  productos: IProductos[] = [];

  constructor(private http: HttpClient) { 
    this.cargarCarrito();
  }

  agregarProducto(producto: IProductos) {
    const index = this.productos.findIndex(p => p.pkProducto === producto.pkProducto);
    if (index > -1) {
      this.productos[index].cantidad = (this.productos[index].cantidad || 0) + 1;
    } else {
      producto.cantidad = 1;
      producto.precioCantidad = producto.precioVenta;
      this.productos.push(producto);
    }
    this.guardarCarrito();
  }
  
  enviarProductos(username: string, productos: IProductos[]) {
    console.log(productos);
    const url = `${this.baseUrl}${this.controller}/crearVentasMasivas`; // Reemplaza con la ruta de tu API para enviar los productos y el ID del usuario
    const payload = {
      username: username,
      productos: productos
    };
    return this.http.post(url, payload);
  }
  eliminarProducto(producto: IProductos) {
    const index = this.productos.indexOf(producto);
    if (index > -1) {
      this.productos.splice(index, 1);
    }
    this.guardarCarrito();
  }
  vaciarCarrito(){
    this.productos = [];
    localStorage.removeItem('carrito');  
  }
  obtenerCantidadProductos() {
    return this.productos.length;
  }
  obtenerProductos() {
    return this.productos;
  }
  public guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(this.productos));
  }
  private cargarCarrito() {
    const carrito = localStorage.getItem('carrito');
    if (carrito) {
      this.productos = JSON.parse(carrito);
    }
  }
}