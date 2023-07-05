import { Observable, catchError, of } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { IProductos } from 'src/app/models/IProductos.interface.';
import { IResponse } from 'src/app/models/IResponse.interface';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private baseUrl: string = environment.serverUrl;
  private controller = '/api/Productos';

  constructor(private http: HttpClient, private router: Router) { }

  listarProducto(): Observable<IProductos[]>{
    return this.http.get<IProductos[]>(`${this.baseUrl}${this.controller}/productos`);
  }

  crearProducto(FormProducto: FormGroup){
    return this.http.post<IResponse>(`${this.baseUrl}${this.controller}/crearProducto`, FormProducto).pipe(
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
            title: 'Producto registrado correctamente',
            text: response.message,
            showConfirmButton: false,
            timer: 1500,
          });
          setTimeout(() => {
            this.router.navigate(['base/productos']);
          }, 2000);
        } else {
          Swal.fire({
            position: 'top-end',
            icon: 'warning',
            title: 'Producto no registrado',
            text: response.message,
            showConfirmButton: false,
            timer: 3500,
          });
        }
      });
  }
  editarProducto(FormProducto: IProductos){
    return this.http.post<IResponse>(`${this.baseUrl}${this.controller}/actualizarProducto`, FormProducto).pipe(
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
            title: 'Producto editado correctamente',
            text: response.message,
            showConfirmButton: false,
            timer: 1500,
          });
          setTimeout(() => {
            this.router.navigate(['base/productos']);
          }, 2000);
        } else {
          Swal.fire({
            position: 'top-end',
            icon: 'warning',
            title: 'No se pudo editar el usuario',
            text: response.message,
            showConfirmButton: false,
            timer: 3500,
          });
        }
      });
  }

  buscarPorId(id: number){
    return this.http.get<IProductos>(`${this.baseUrl}${this.controller}/producto/${id}`);
  }
 

  eliminarProducto(id: number){
    console.log(id);
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
            title: 'Producto eliminado correctamente',
            text: response.message,
            showConfirmButton: false,
            timer: 1500,
          });
          setTimeout(() => {
            location.reload(); // Recargar la página después de 2 minutos
          }, 1500);
        } else {
          Swal.fire({
            position: 'top-end',
            icon: 'warning',
            title: 'Producto no eliminado',
            text: response.message,
            showConfirmButton: false,
            timer: 3500,
          });
        }
      });
  }

}
