import { IResponse } from './../../models/IResponse.interface';
import { IUsuario } from './../../models/IUsuario.interface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
  private baseUrl: string = environment.serverUrl;
  private controller = '/api/Usuarios';
  private username$ = new BehaviorSubject<string>("");
  private role$ = new BehaviorSubject<string>("");
  constructor(private http: HttpClient, private router: Router) { }

  listarUsuarios(): Observable<IUsuario[]> {
    return this.http.get<IUsuario[]>(`${this.baseUrl}${this.controller}/usuarios`);
  }

  registrarse(FormRegistro: FormGroup) {
    return this.http.post<IResponse>(`${this.baseUrl}${this.controller}/crearUsuario`, FormRegistro).pipe(
      catchError((error: HttpErrorResponse) => {
        let response: IResponse = {
          success: false,
          helperData: '',
          message: '',
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
            text: response.message,
            showConfirmButton: false,
            timer: 1500,
          });
          setTimeout(() => {
            this.router.navigate(['base/usuarios']);
          }, 2000);
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

  eliminarUsuario(id: number) {
    return this.http.delete<IResponse>(`${this.baseUrl}${this.controller}/eliminar/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        let response: IResponse = {
          success: false,
          helperData: '',
          message: '',
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
            title: 'Usuario eliminado correctamente',
            text: response.message,
            showConfirmButton: false,
            timer: 1500,
          });
          setTimeout(() => {
            location.reload(); // Recargar la página después de 2 minutos
          }, 2000);
        } else {
          Swal.fire({
            position: 'top-end',
            icon: 'warning',
            title: 'Usuario no eliminado',
            text: response.message,
            showConfirmButton: false,
            timer: 3500,
          });
        }
      });
  }

  editarUsuario(FormEditar: IUsuario){
    return this.http.post<IResponse>(`${this.baseUrl}${this.controller}/actualizarUsuario`, FormEditar).pipe(
      catchError((error: HttpErrorResponse) => {
        let response: IResponse = {
          success: false,
          helperData: '',
          message: '',
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
            title: 'Usuario editado correctamente',
            text: response.message,
            showConfirmButton: false,
            timer: 1500,
          });

        } else {
          Swal.fire({
            position: 'top-end',
            icon: 'warning',
            title: 'Usuario no se pudo editar',
            text: response.message,
            showConfirmButton: false,
            timer: 3500,
          });
        }
      });
  }

  buscarPorId(id: number){
    return this.http.get<IUsuario>(`${this.baseUrl}${this.controller}/usuario/${id}`);
  }
  buscarPorUsername(username: string){
    console.log(username)
    return this.http.get<IUsuario>(`${this.baseUrl}${this.controller}/usuarioporusername/${username}`);
  }

  public getRoleFromStore() {
    return this.role$.asObservable();
  }

  public setRoleFromStore(role: string) {
    this.role$.next(role);
  }

  public getUsernameFromStore() {
    return this.username$.asObservable();
  }

  public setUsernameFromStore(username: string) {
    this.username$.next(username);
  }

}
