import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICategoria } from 'src/app/models/ICategoria.interface';
import { IProductos } from 'src/app/models/IProductos.interface.';
import { CarritoService } from 'src/app/services/carritoService/carrito.service';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';
import { ProductsService } from 'src/app/services/productsService/products.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  constructor(private _productsService: ProductsService, private router: Router,  private catServicio: CategoriaService, private carritoService: CarritoService) { }
  Categorias: ICategoria[]=[];
  productos: IProductos[] = [];
  priceMin= 0;
  priceMax = 1000;
  searchTerm= '';
  categoriaSelec=0;
  ngOnInit(): void {
    this.obtenerProductos();
    this.obtenerCategorias();
  }

  filteredProducts:IProductos[]= [];

  updatePriceMin(event: Event) {
    const target = event.target as HTMLInputElement;
    this.priceMin =  parseFloat(target.value);
    this.applyFilters();
  }

  updatePriceMax(event: Event) {
    const target = event.target as HTMLInputElement;
    this.priceMax =  parseFloat(target.value);
    this.applyFilters();
  }

  buscarNombre(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchTerm =  target.value;
    this.applyFilters();
  }
  onCategoriaSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    this.categoriaSelec =  parseFloat(target.value);
    this.applyFilters();
  }
  applyFilters() {
    this.filteredProducts = this.productos.filter(product => {
      const matchesPriceMin = isNaN(this.priceMin) || product.precioVenta >= this.priceMin;
      const matchesPriceMax = isNaN(this.priceMax) || product.precioVenta <= this.priceMax;
      const matchesSearchTerm = this.searchTerm.trim() === '' || product.nombreProducto.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesCat = isNaN(this.categoriaSelec) || product.fkCategoria == this.categoriaSelec;

      return matchesPriceMin && matchesPriceMax && matchesSearchTerm && matchesCat;
    });
  }
  obtenerProductos() {
    this._productsService.listarProducto().subscribe(data => {
      this.productos = data;
      this.filteredProducts = data;
    })
  }
  verProducto(id: number) {
    this.router.navigate(['/base/ficha/', id]);
  }
  addCarrito(producto: IProductos) {
    this.carritoService.agregarProducto(producto);
  }
  obtenerCategorias() {
    this.catServicio.listarCategorias().subscribe(
      (response) => {
        this.Categorias = response;
      },
      (error) => {
        console.error('Error al obtener productos:', error);
      }
    );
  }
}