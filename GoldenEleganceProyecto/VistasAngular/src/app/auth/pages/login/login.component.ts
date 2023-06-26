import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { IResponseToken } from '../../../models/IResponseToken.interface';
import { catchError, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { UserStoreService } from 'src/app/services/Usuarios/user-store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private route: Router,
    private userStoreS: UserStoreService
  ) { }
  role = "";
  claseDiv = 'container';

  sigUpForm: FormGroup = this.fb.group({
    Nombre: ['', Validators.required],
    Username: ['', Validators.required],
    Correo: ['', Validators.required],
    Password: ['', Validators.required],
  });

  loginForm: FormGroup = this.fb.group({
    Correo: ['', Validators.required],
    Password: ['', Validators.required],
  });


  cambiar() {
    this.claseDiv = 'container  right-panel-active';
  }

  eliminar() {
    this.claseDiv = 'container';
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.auth.iniciarSesion(this.loginForm.value)
    }
  }
  onSingUp() {
    if (this.sigUpForm.valid) {
       this.auth.registrarse(this.sigUpForm.value);
    }
  }
}