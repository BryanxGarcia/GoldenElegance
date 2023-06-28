import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserStoreService } from 'src/app/services/Usuarios/user-store.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css'],
})
export class CrearUsuarioComponent {
  constructor(
    private fb: FormBuilder,
    private userService: UserStoreService,
    private auth: AuthService,
  ) { }
  sigUpForm: FormGroup = this.fb.group({
    Nombre: ['', Validators.required],
    Username: ['', Validators.required],
    Correo: ['', Validators.required],
    Password: ['', Validators.required],
    Apellido: ['', Validators.required],
    Telefono: ['', Validators.required],
    Direccion: ['', Validators.required],
    FKRol: ['', Validators.required],
  });

  registrarUsuario() {
    if (this.sigUpForm.valid) {
      console.log(this.sigUpForm.value);
      this.userService.registrarse(this.sigUpForm.value);
    }
  }

}
