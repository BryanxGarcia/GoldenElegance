import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, catchError, of } from 'rxjs';
import { ICategoria } from 'src/app/models/ICategoria.interface';
import { IResponse } from 'src/app/models/IResponse.interface';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private baseUrl: string = environment.serverUrl;
  private controller = '/api/Categorias';
  constructor(private http: HttpClient) { }
  
  listarCategorias(): Observable<ICategoria[]> {
    return this.http.get<ICategoria[]>(`${this.baseUrl}${this.controller}/categorias`);
  }

  registrarcategoria(FormCategoria: FormGroup) {
    return this.http.post<IResponse>(`${this.baseUrl}${this.controller}/crearCategoria`, FormCategoria).pipe(
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

  eliminarCategoria(id: number) {
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
          }, 5000);
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

  editarCategoria(FormEditar: ICategoria){
    return this.http.post<IResponse>(`${this.baseUrl}${this.controller}/actualizarCategoria`, FormEditar).pipe(
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
          }, 5000);
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

  buscarPorId(id: number){
    return this.http.get<ICategoria>(`${this.baseUrl}${this.controller}/categoria/${id}`);
  }
}
