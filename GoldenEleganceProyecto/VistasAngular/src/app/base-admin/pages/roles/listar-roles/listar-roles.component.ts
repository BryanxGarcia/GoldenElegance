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

  constructor(public rolServicio: RolesService, private router: Router) {}

  ngOnInit() {
    this.obtenerRoles();
  }

  obtenerRoles() {
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
    if(id){
    this.rolServicio.eliminarRol(id);
    }
}
irAUsuario(id: number) {
  this.router.navigate(['/base/roles/editar/', id]);
}

}
