import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, catchError, of } from 'rxjs';
import { ICategoria } from 'src/app/models/ICategoria.interface';
import { IResponse } from 'src/app/models/IResponse.interface';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  public baseUrl: string = environment.serverUrl;
  public controller = '/api/Categorias';
  constructor(private http: HttpClient, public router:Router) { }
  
  listarCategorias(): Observable<ICategoria[]> {
    return this.http.get<ICategoria[]>(`${this.baseUrl}${this.controller}/categorias`);
  }

  registrarcategoria(FormCategoria: FormGroup){
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
            title: 'Categoria registrado correctamente',
            text: response.message,
            showConfirmButton: false,
            timer: 1500,
          });
          setTimeout(() => {
            this.router.navigate(['base/categorias']);
          }, 2000);
        } else {
          Swal.fire({
            position: 'top-end',
            icon: 'warning',
            title: 'Categoria no registrada',
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
            title: 'Categoria eliminada correctamente',
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
            title: 'Categoria no eliminada',
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
            title: 'Categoria editada correctamente',
            text: response.message,
            showConfirmButton: false,
            timer: 1500,
          });
          setTimeout(() => {
            this.router.navigate(['base/categorias']);
          }, 2000);
        } else {
          Swal.fire({
            position: 'top-end',
            icon: 'warning',
            title: 'Categoria no actualizada',
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
