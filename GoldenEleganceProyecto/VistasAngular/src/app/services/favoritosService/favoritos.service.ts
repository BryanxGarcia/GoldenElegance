import { IFavorito } from './../../models/IFavoritoExiste.interface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { IProductos } from 'src/app/models/IProductos.interface.';
import { IResponse } from 'src/app/models/IResponse.interface';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class FavoritosService {


  private baseUrl: string = environment.serverUrl;
  private controller = '/api/Favoritos';

  constructor(private http: HttpClient) { }

  // listarProducto(): Observable<IProductos[]>{
  //   return this.http.get<IProductos[]>(`${this.baseUrl}${this.controller}/productos`);
  // }
  buscarPorId(favorito: IFavorito){
    return this.http.post<IResponse>(`${this.baseUrl}${this.controller}/existeFavorito`, favorito);
  }

  eliminarFavorito(favorito: IFavorito){
    return this.http.delete<IResponse>(`${this.baseUrl}${this.controller}/eliminar`,  {
      body: favorito // Enviar el objeto favorito en el cuerpo de la solicitud
    }).pipe(
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
          setTimeout(() => {
            location.reload(); // Recargar la página después de 2 minutos
          }, 500);
        } else {
          Swal.fire({
            position: 'top-end',
            icon: 'warning',
            title: 'No se quito de favoritos',
            text: response.message,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  }

  agregarFavorito(favorito: IFavorito){
    return this.http.post<IResponse>(`${this.baseUrl}${this.controller}/agregar`, favorito).pipe(
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
          setTimeout(() => {
            location.reload(); // Recargar la página después de 2 minutos
          }, 500);
        } else {
          Swal.fire({
            position: 'top-end',
            icon: 'warning',
            title: 'Producto no añadido a favoritos',
            text: response.message,
            showConfirmButton: false,
            timer: 3500,
          });
        }
      });
  }

  listarFavoritos(favorito: IFavorito): Observable<IProductos[]>{
    return this.http.post<IProductos[]>(`${this.baseUrl}${this.controller}/favoritos`, favorito);
  }
}