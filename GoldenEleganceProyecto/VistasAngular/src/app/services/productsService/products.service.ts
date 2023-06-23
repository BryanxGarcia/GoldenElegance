import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { IProductos } from 'src/app/models/IProductos.interface.';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private baseUrl: string = environment.serverUrl;
  private controller: string = '/api/Productos';

  constructor(private http: HttpClient, private router: Router) { }

  listarProducto(): Observable<IProductos[]>{
    return this.http.get<IProductos[]>(`${this.baseUrl}${this.controller}/productos`);
  }

  crearProducto(FormProducto: FormGroup){
    return this.http.post<any>(`${this.baseUrl}${this.controller}/crearProducto`, FormProducto);
  }

  editarProducto(FormProducto: FormGroup){
    return this.http.post<any>(`${this.baseUrl}${this.controller}/actualizarProducto`, FormProducto);
  }

  buscarPorId(){
    return this.http.get<any>(`${this.baseUrl}${this.controller}/{Id}`);
  }

  eliminarProducto(){
    return this.http.delete<any>(`${this.baseUrl}${this.controller}/eliminar/{Id}`);
  }

}
