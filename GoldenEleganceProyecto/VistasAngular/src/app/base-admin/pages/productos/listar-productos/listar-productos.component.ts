import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IProductos } from 'src/app/models/IProductos.interface.';
import { ProductsService } from 'src/app/services/productsService/products.service';

@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar-productos.component.html',
  styleUrls: ['./listar-productos.component.css']
})
export class ListarProductosComponent implements OnInit {
  Prductos: IProductos[] = [];

  constructor(public prodService: ProductsService, private router: Router) { }

  ngOnInit() {
    this.obtenerProductos();
  }

  obtenerProductos() {
    this.prodService.listarProducto().subscribe(
      (response) => {
        this.Prductos = response;
      },
      (error) => {
        console.error('Error al obtener productos:', error);
      }
    );
  }

  eliminar(id: number) {
    console.log(id);
    this.prodService.eliminarProducto(id);
  }
  irAProducto(id: number) {
    this.router.navigate(['/base/productos/editar/', id]);
  }

}

