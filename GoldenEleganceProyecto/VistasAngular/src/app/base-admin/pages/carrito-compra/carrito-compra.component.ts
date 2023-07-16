import { Component, ElementRef, OnInit } from '@angular/core';
import { IProductos } from 'src/app/models/IProductos.interface.';
import { CarritoService } from 'src/app/services/carritoService/carrito.service';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-carrito-compra',
  templateUrl: './carrito-compra.component.html',
  styleUrls: ['./carrito-compra.component.css']
})
export class CarritoCompraComponent implements OnInit {
  showPaypalButtons = false;
  productos: IProductos[] = [];
  total = 0;
  usuario = "";
  constructor(private carritoService: CarritoService, private paypalRef: ElementRef, private userService: AuthService) {
  }
  payPalConfig?: IPayPalConfig;
  ngOnInit(): void {
    this.obtenerUsuario();
    this.productos = this.carritoService.obtenerProductos();
    this.initConfig();
  }
  obtenerUsuario() {
    const username = this.userService.getUsernameFromToken();
    this.usuario = username;
  }

  private initConfig(): void {
    const itemLista = this.productos.map((producto: IProductos) => {
      return {
        name: producto.nombreProducto,
        quantity: producto.cantidad?.toString(),
        unit_amount: {
          currency_code: "MXN",
          value: producto.precioVenta.toString()
        }
      };
    });
    this.payPalConfig = {
      currency: 'MXN',
      clientId: environment.clientIDPayPal,
      createOrderOnClient: () => <ICreateOrderRequest><unknown>{
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: 'MXN',
            value: this.total.toFixed(2),
            breakdown: {
              item_total: {
                currency_code: 'MXN',
                value: this.total.toFixed(2)
              }
            }
          },
          items: itemLista,
        }]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical',
        color: 'blue'
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then(() => {
          console.log('onApprove - you can get full order details inside onApprove: ');
          this.enviarDatos();
          this.vaciarCarrito();
        });
        // this._videojuegoService.EliminarVideojuego(this.Videojuego);

      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', (data));
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);

      },
      onError: err => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      }
    };
  }

  eliminarProducto(producto: IProductos) {
    this.carritoService.eliminarProducto(producto);
  }
  vaciarCarrito() {
    this.carritoService.vaciarCarrito();
  }
  obtenerTotalProductos(): number {
    return this.productos.reduce((total, producto) => total + (producto.cantidad || 0), 0);
  }

  obtenerPrecioTotal(): number {
    this.total = this.productos.reduce((total, producto) => total + ((producto.precioVenta || 0) * (producto.cantidad || 0)), 0);
    return this.total;
  }

  realizarCompra() {
    this.showPaypalButtons = true;
  }
  actualizarCantidad(producto: IProductos) {
    if (producto.cantidad != null) {
    producto.cantidad = Math.max(0, producto.cantidad);
    } // Asegurar que la cantidad no sea negativa
    this.carritoService.guardarCarrito(); // Guardar el carrito actualizado en el localStorage
  }
  incrementarCantidad(producto: IProductos) {
    producto.cantidad = (producto.cantidad || 0) + 1;
    producto.precioCantidad = (producto.precioVenta * producto.cantidad)
    this.carritoService.guardarCarrito(); // Guardar el carrito actualizado en el localStorage
  }

  decrementarCantidad(producto: IProductos) {
    if (producto.cantidad != null) {
      if (producto.cantidad > 1) {
        producto.cantidad = (producto.cantidad || 1) - 1;
        producto.precioCantidad = (producto.precioVenta * producto.cantidad)
        this.carritoService.guardarCarrito(); // Guardar el carrito actualizado en el localStorage
      }
    }
  }
  enviarDatos(): void {
    const productos = this.productos;
    const username = this.usuario;
    this.carritoService.enviarProductos(username, productos).subscribe(
      response => {
        console.log(response);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Se realizo la compra correctamente',
          showConfirmButton: false,
          timer: 1500,
        }); setTimeout(() => {
          location.reload(); // Recargar la página después de 2 minutos
        }, 500);
      },
      error => {
        console.log(error)
      }
    );
  }
}