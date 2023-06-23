import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IResponse } from '../models/IResponse.interface';
import { IMensajeria } from '../models/IMensajeria.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MensajeriaService {
private baseUrl: string = environment.serverUrl;

constructor(private http: HttpClient) { }

enviarContacto(Mensaje:IMensajeria ){
 return this.http.post<IResponse>(`${this.baseUrl}/api/Email/SendEmailContacto`, Mensaje)
}
}

