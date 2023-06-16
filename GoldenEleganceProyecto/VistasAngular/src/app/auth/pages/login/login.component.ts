import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { IResponseToken } from '../../../models/IResponseToken.interface';
import { IResponse } from 'src/app/models/IResponse.interface';
import { catchError, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private route: Router
  ) {}

  claseDiv: string = 'container';

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

  ngOnInit(): void {}

  cambiar() {
    this.claseDiv = 'container  right-panel-active';
  }

  eliminar() {
    this.claseDiv = 'container';
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.auth
        .iniciarSesion(this.loginForm.value)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            let response: IResponse = {
              success: false,
              helperData: "",
              message: "",
            };
            if(error.status == 404 || error.status == 400 || error.status == 401){
              if(error.error != null){
                response = error.error;
              }
            }
            return of(response);
          })
        )
        .subscribe((response: IResponseToken) => {
          if (response.success) {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Inicio de sesión correcto',
              showConfirmButton: false,
              timer: 1500,
            });
            this.auth.almacenarToken(response.token);
            this.route.navigate(['base/dashboard']);
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'warning',
              title: 'Error al iniciar sesión',
              text: response.message,
            });
          }
        });
    }
  }

  onSingUp() {
    if (this.sigUpForm.valid) {
      this.auth
        .registrase(this.sigUpForm.value)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            let response: IResponse = {
              success: false,
              helperData: 'Datos incorrectos',
              message: 'No se pudo iniciar sesion',
            };
            if(error.status == 404 || error.status == 400 || error.status == 401){
              if(error.error != null){
                response = error.error;
              }
            }
            return of(response);
          })
        )
        .subscribe((response: IResponse) => {
          if (response.success) {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Usuario registrado correctamente',
              showConfirmButton: false,
              timer: 1500,
            });
            this.sigUpForm.reset();
            this.route.navigate(['login']);
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'warning',
              title: 'Usuario no registrado intentelo mas tarde',
              text: response.message,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
    }
  }
}
