import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IHistorial } from 'src/app/models/IHistorial.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HistorialService {
  private baseUrl: string = environment.serverUrl;
  private controller = '/api/Ventas';

  constructor(private http: HttpClient) {}

  listarHistorialPorUsuario(username: string){
    return this.http.get<IHistorial[]>(`${this.baseUrl}${this.controller}/historial/${username}`);
    
  }
}
