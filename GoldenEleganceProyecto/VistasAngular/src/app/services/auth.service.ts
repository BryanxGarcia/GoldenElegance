import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { IResponse } from '../models/IResponse.interface';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenApiModel } from '../models/Token-api.model';
import { IResponseToken } from '../models/IResponseToken.interface';
import { ResetPassword } from '../models/reset-password.model';
import { ConfirmarEmail } from '../models/confirmarEmail.model';
import Swal from 'sweetalert2';
import { UserStoreService } from 'src/app/services/Usuarios/user-store.service';
import { catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.serverUrl;
  private controller = '/api/Authentication';
  private userPayload;
  role = "";

  constructor(private http: HttpClient, private router: Router, private userStoreS: UserStoreService) {
    this.userPayload = this.decodedToken();
  }


  registrarse(FormRegistro: FormGroup) {
    console.log(FormRegistro);
    
    return this.http.post<IResponse>(`${this.baseUrl}${this.controller}/Registro`, FormRegistro).pipe(
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
          setTimeout(() => {
            location.reload(); // Recargar la página después de 2 minutos
          }, 5000);
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
  iniciarSesion(FormInicio: FormGroup) {
    return this.http.post<IResponseToken>(`${this.baseUrl}${this.controller}/Login`, FormInicio).pipe(
      catchError((error: HttpErrorResponse) => {
        let response: IResponseToken = {
          success: false,
          helperData: "",
          message: "",
          token: "",
          refreshToken: ""
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
          if (Number(rol) == 1) {
            this.router.navigate(['base/dashboard']);

          } else {
            this.router.navigate(['base/inicio']);

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
  private StorageUser(response: IResponseToken) {
    this.almacenarToken(response.token);
    this.almacenarRefreshToken(response.refreshToken);
    const tokenPayload = this.decodedToken();
    this.userStoreS.setUsernameFromStore(tokenPayload.name);
    this.userStoreS.setRoleFromStore(tokenPayload.role);
    this.userStoreS.getRoleFromStore()
      .subscribe(valor => {
        const rolFromToken = this.getRolFromToken();
        this.role = valor || rolFromToken;
      })

    return this.role;
  }
  almacenarToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue)
  }
  getToken() {
    return localStorage.getItem('token')
  }

  almacenarRefreshToken(tokenValue: string) {
    localStorage.setItem('refreshToken', tokenValue)
  }
  getRefreshToken() {
    return localStorage.getItem('refreshToken')
  }
  signOut() {
    localStorage.clear();
    this.router.navigate(['/auth/login'])
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token')
  }
  decodedToken() {
    const jwtHelper = new JwtHelperService();
    const token = this.getToken() ?? "";
    return jwtHelper.decodeToken(token);
  }

  getUsernameFromToken() {
    if (this.userPayload)
      return this.userPayload.name;
  }

  getRolFromToken() {
    if (this.userPayload)
      return this.userPayload.role;
  }

  newRefreshToken(tokenApi: TokenApiModel) {
    return this.http.post<IResponseToken>(`${this.baseUrl}${this.controller}/RefreshToken`, tokenApi);
  }

  sendResetPassword(email: string) {
    return this.http.post<IResponse>(`${this.baseUrl}${this.controller}/send-reset-email/${email}`, {})
    .subscribe({
      next:(resp)=>{
        if(resp.success){
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Se realizo correctamente el envio del email' + resp.message,
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          this.router.navigate(['auth/login']);
        }, 5000);}
        else{
          Swal.fire({
            position: 'top-end',
            icon: 'warning',
            title: resp.message ,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }, 
      error:(error)=>{
        Swal.fire({
          position: 'top-end',
          icon: 'warning',
          title: 'No se pudo enviar' + error,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    })
  }

  resetPassword(resetPasswordObj: ResetPassword) {
    return this.http.post<IResponse>(`${this.baseUrl}${this.controller}/reset-password`, resetPasswordObj)
      .subscribe({
        next: (res) => {
          if(res.success){
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Se restablecio correctamente la contraseña',
            showConfirmButton: false,
            timer: 1500,
          });
          setTimeout(() => {
            this.router.navigate(['auth/login']);
          }, 5000);} else{
            Swal.fire({
              position: 'top-end',
              icon: 'warning',
              title: res.message ,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        },
        error: () => {
          Swal.fire({
            position: 'top-end',
            icon: 'warning',
            title: 'Sucedio un error al cambiar la contraseña',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
  }

  confirmarCuenta(confirmarObj: ConfirmarEmail) {
    return this.http.post<IResponse>(`${this.baseUrl}${this.controller}/confirmarCorreo`, confirmarObj).subscribe({
      next: (res) => {
        if(res.success){
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: res.message,
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          this.router.navigate(['auth/login']);
        }, 5000);}
        else{
          Swal.fire({
            position: 'top-end',
            icon: 'warning',
            title: res.message ,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      },
      error: (err) => {
        Swal.fire({
          position: 'top-end',
          icon: 'warning',
          title: err ,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    })
  }

}