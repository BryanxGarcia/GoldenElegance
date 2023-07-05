import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IRoles } from 'src/app/models/IRoles.interface';
import { RolesService } from 'src/app/services/roles/roles.service';

@Component({
  selector: 'app-editar-rol',
  templateUrl: './editar-rol.component.html',
  styleUrls: ['./editar-rol.component.css']
})
export class EditarRolComponent implements OnInit {
  id= 0;
  Roles: IRoles={
    pkRol: 0,
    nombre: '',
    descripcion: ''
  }
  constructor(private route: ActivatedRoute, private rolesService:RolesService, private fb: FormBuilder) { }
  editarRol: FormGroup = this.fb.group({
    Nombre: ['', Validators.required],
    Descripcion: ['', Validators.required],
    
  });
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.obtenerRol();
    
  }

  obtenerRol(){
    this.rolesService.buscarPorId(this.id).subscribe(
      (response) => {
        this.Roles = response;
        this.editarRol.controls['Nombre'].setValue(this.Roles.nombre);
        this.editarRol.controls['Descripcion'].setValue(this.Roles.descripcion);
      },
      (error) => {
        console.error('Error al obtener productos:', error);
      }
    );
  }
  guardarRol(){
    this.Roles.nombre= this.editarRol.controls['Nombre'].value;
    this.Roles.descripcion= this.editarRol.controls['Descripcion'].value;

    this.rolesService.editarRol(this.Roles);
  }

}