import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { IResponse } from '../models/IResponse.interface';
import { IMensajeria } from '../models/IMensajeria.interface';

@Injectable({
  providedIn: 'root'
})
export class MensajeriaService {
private baseUrl: string = environment.serveUrl;
private controller: string ='/api/Email';

constructor(private http: HttpClient) { }

enviarContacto(Mensaje:IMensajeria ){
 return this.http.post<IResponse>(`${this.baseUrl}${this.controller}/SendEmailContacto`, Mensaje)
}
}

