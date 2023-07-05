import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IRoles } from 'src/app/models/IRoles.interface';
import { RolesService } from 'src/app/services/roles/roles.service';

@Component({
  selector: 'app-listar-roles',
  templateUrl: './listar-roles.component.html',
  styleUrls: ['./listar-roles.component.css']
})
export class ListarRolesComponent  implements OnInit {
  Roles: IRoles[]=[];

  constructor(private rolServicio: RolesService, private router: Router) {}

  ngOnInit() {
    this.obtenerProductos();
  }

  obtenerProductos() {
    this.rolServicio.listarRol().subscribe(
      (response) => {
        this.Roles = response;
      },
      (error) => {
        console.error('Error al obtener productos:', error);
      }
    );
  }

  eliminar(id: number) {
    console.log(id);
    this.rolServicio.eliminarRol(id);
}
irAUsuario(id: number) {
  this.router.navigate(['/base/roles/editar/', id]);
}

}
