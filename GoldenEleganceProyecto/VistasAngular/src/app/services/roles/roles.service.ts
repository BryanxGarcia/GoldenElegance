import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, catchError, of } from 'rxjs';
import { IResponse } from 'src/app/models/IResponse.interface';
import { IRoles } from 'src/app/models/IRoles.interface';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  private baseUrl: string = environment.serverUrl;
  private controller = '/api/Roles';
  constructor(private http: HttpClient,private router: Router) { }
  
  listarRol(): Observable<IRoles[]> {
    return this.http.get<IRoles[]>(`${this.baseUrl}${this.controller}/roles`);
  }

  registrarRol(FormRCrearRol: FormGroup) {
    return this.http.post<IResponse>(`${this.baseUrl}${this.controller}/crearRol`, FormRCrearRol).pipe(
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
            title: 'Rol creado correctamente',
            text: response.message,
            showConfirmButton: false,
            timer: 1500,
          });
          setTimeout(() => {
            this.router.navigate(['base/roles']);
          }, 2000);
        } else {
          Swal.fire({
            position: 'top-end',
            icon: 'warning',
            title: 'Rol no registrado',
            text: response.message,
            showConfirmButton: false,
            timer: 3500,
          });
        }
      });
  }

  eliminarRol(id: number) {
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
            title: 'Rol eliminado correctamente',
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
            title: 'El rol no puede ser eliminado',
            text: response.message,
            showConfirmButton: false,
            timer: 3500,
          });
        }
      });
  }

  editarRol(FormEditar: IRoles){
    return this.http.post<IResponse>(`${this.baseUrl}${this.controller}/actualizar`, FormEditar).pipe(
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
            title: 'Rol actualizado correctamente',
            text: response.message,
            showConfirmButton: false,
            timer: 1500,
          });
          setTimeout(() => {
            this.router.navigate(['base/roles']);
          }, 5000);
        } else {
          Swal.fire({
            position: 'top-end',
            icon: 'warning',
            title: 'El rol no pudo ser actualizado',
            text: response.message,
            showConfirmButton: false,
            timer: 3500,
          });
        }
      });
  }

  buscarPorId(id: number){
    return this.http.get<IRoles>(`${this.baseUrl}${this.controller}/roles/${id}`)
  }
}
