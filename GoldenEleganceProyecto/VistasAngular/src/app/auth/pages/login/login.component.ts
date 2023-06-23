import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { IResponseToken } from '../../../models/IResponseToken.interface';
import { IResponse } from 'src/app/models/IResponse.interface';
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
  role= "";
  claseDiv= 'container';

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
      this.auth
        .iniciarSesion(this.loginForm.value)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            let response: IResponseToken = {
              success: false,
              helperData: "",
              message: "",
              token:"",
              refreshToken:""
            };
            if (error.status == 404 || error.status == 400 || error.status == 401) {
              if (error.error != null) {
                response = error.error;
              }
            }
            return of(response);
          })
        )
        .subscribe((response) => {
          if (response.success) {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Inicio de sesión correcto',
              showConfirmButton: false,
              timer: 2500,
            });
            const rol = this.StorageUser(response);
            if(Number(rol) == 1 ){
              this.route.navigate(['base/dashboard']);

            }else{
              this.route.navigate(['base/inicio']);

            }
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'warning',
              title: 'Error al iniciar sesión',
              text: response.message,
              timer: 2500,

            });
          }
        });
    }
  }
  private StorageUser(response: IResponseToken) {
    this.auth.almacenarToken(response.token);
    this.auth.almacenarRefreshToken(response.refreshToken);
    const tokenPayload = this.auth.decodedToken();
    this.userStoreS.setUsernameFromStore(tokenPayload.name);
    this.userStoreS.setRoleFromStore(tokenPayload.role);
    this.userStoreS.getRoleFromStore()
      .subscribe(valor => {
        const rolFromToken = this.auth.getRolFromToken();
        this.role = valor || rolFromToken;
      })

      return this.role;
  }

  onSingUp() {
    if (this.sigUpForm.valid) {
      this.auth
        .registrarse(this.sigUpForm.value)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            let response: IResponse = {
              success: false,
              helperData: 'Datos incorrectos',
              message: 'No se pudo iniciar sesion',
            };
            if (error.status == 404 || error.status == 400 || error.status == 401) {
              if (error.error != null) {
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
              title: 'Usuario no registrado',
              text: response.message,
              showConfirmButton: false,
              timer: 3500,
            });
          }
        });
    }
  }
}
