import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RolesService } from 'src/app/services/roles/roles.service';

@Component({
  selector: 'app-crear-rol',
  templateUrl: './crear-rol.component.html',
  styleUrls: ['./crear-rol.component.css']
})
export class CrearRolComponent {
  constructor(
    private fb: FormBuilder,
    public rolService: RolesService,
  ) { }
  crearRol: FormGroup = this.fb.group({
    Nombre: ['', Validators.required],
    Descripcion: ['', Validators.required],
  });

  registrarRol() {
    if (this.crearRol.valid) {
      this.rolService.registrarRol(this.crearRol.value);
    }
  }

}