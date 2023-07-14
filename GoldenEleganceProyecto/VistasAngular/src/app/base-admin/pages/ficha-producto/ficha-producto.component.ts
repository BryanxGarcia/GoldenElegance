import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICategoria } from 'src/app/models/ICategoria.interface';
import { IFavorito } from 'src/app/models/IFavoritoExiste.interface';
import { IProductos } from 'src/app/models/IProductos.interface.';
import { AuthService } from 'src/app/services/auth.service';
import { CarritoService } from 'src/app/services/carritoService/carrito.service';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';
import { FavoritosService } from 'src/app/services/favoritosService/favoritos.service';
import { ProductsService } from 'src/app/services/productsService/products.service';

@Component({
  selector: 'app-ficha-producto',
  templateUrl: './ficha-producto.component.html',
  styleUrls: ['./ficha-producto.component.css']
})
export class FichaProductoComponent implements OnInit {
  id = 0;
  Categorias: ICategoria[] = [];
  Producto: IProductos = {
    pkProducto: 0,
    nombreProducto: '',
    descripcion: '',
    fkCategoria: 0,
    precioVenta: 0,
    inventario: 0,
    imagen: ''
  };
  Favorito: IFavorito = {
    fkProducto: 0,
    usuario: ""
  }
  checkFavorito = false;
  constructor(
    private route: ActivatedRoute,
    public productosService: ProductsService,
    private catServicio: CategoriaService,
    public favoritoService: FavoritosService,
    private userService: AuthService,
    private carritoService:CarritoService) { }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.Favorito.fkProducto = params['id'];
    });
    this.obtenerProducto();
    this.obtenerCategorias();
    this.obtenerUsuario();
    this.validarFavorito();
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
  obtenerProducto() {
    this.productosService.buscarPorId(this.id).subscribe(
      (response) => {
        this.Producto = response;
      },
      (error) => {
        console.error('Error al obtener productos:', error);
      }
    );
  }

  obtenerUsuario() {
    const username = this.userService.getUsernameFromToken();
    this.Favorito.usuario = username;
  }
  
  validarFavorito() {
    this.favoritoService.buscarPorId(this.Favorito).subscribe(
      (response) => {
        this.checkFavorito = response.success;
      },
      (error) => {
        console.error('Error al obtener validacion:', error);
      }
    );
  }
  addFavorito(){
    this.favoritoService.agregarFavorito(this.Favorito);
  }
  eliminarFavorito(){
    this.favoritoService.eliminarFavorito(this.Favorito);
  }
  addCarrito(producto: IProductos) {
    this.carritoService.agregarProducto(producto);
  }
}