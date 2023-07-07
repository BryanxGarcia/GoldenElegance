import { UserStoreService } from 'src/app/services/Usuarios/user-store.service';
import { Component, OnInit } from '@angular/core';
import { IUsuario } from 'src/app/models/IUsuario.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-usuario',
  templateUrl: './listar-usuario.component.html',
  styleUrls: ['./listar-usuario.component.css']

})
export class ListarUsuarioComponent implements OnInit {
  usuarios: IUsuario[] = [];

  constructor(public userServicio: UserStoreService, private router: Router) { }

  ngOnInit() {
    this.obtenerProductos();
  }

  obtenerProductos() {
    this.userServicio.listarUsuarios().subscribe(
      (response) => {
        this.usuarios = response;
      },
      (error) => {
        console.error('Error al obtener productos:', error);
      }
    );
  }

  eliminar(id: number) {
    this.userServicio.eliminarUsuario(id);
  }
  irAUsuario(id: number) {
    this.router.navigate(['/base/usuario/editar/', id]);
  }

}
