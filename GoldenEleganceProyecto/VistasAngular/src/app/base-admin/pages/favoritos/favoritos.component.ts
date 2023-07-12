import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IFavorito } from 'src/app/models/IFavoritoExiste.interface';
import { IProductos } from 'src/app/models/IProductos.interface.';
import { AuthService } from 'src/app/services/auth.service';
import { FavoritosService } from 'src/app/services/favoritosService/favoritos.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent implements OnInit{
  constructor(private favoritoService: FavoritosService, private router: Router,private userService: AuthService){}

  Productos: IProductos[] = [];
  
  Favorito: IFavorito = {
    fkProducto: 0,
    usuario: ""
  }
  ngOnInit(): void {
    this.obtenerUsuario();
    this.obtenerProductos();
  }

  obtenerUsuario() {
    const username = this.userService.getUsernameFromToken();
    this.Favorito.usuario = username;
  }
  obtenerProductos() {
    this.favoritoService.listarFavoritos(this.Favorito).subscribe(data => {
      this.Productos = data;
    })
  }
  verProducto(id: number) {
    this.router.navigate(['/base/ficha/', id]);
  }
  addCarrito(id:number){
    console.log(id)
  }

}
