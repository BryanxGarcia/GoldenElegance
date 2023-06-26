import { Component, OnInit } from '@angular/core';
import { IProductos } from 'src/app/models/IProductos.interface.';
import { ProductsService } from 'src/app/services/productsService/products.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit{

productos:IProductos[] =[];

  constructor(private _productsService: ProductsService){

  }

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos() {
    this._productsService.listarProducto().subscribe(data => {
      this.productos = data;
    })
  }
}
