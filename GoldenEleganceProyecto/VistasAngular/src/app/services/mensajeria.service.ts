import { Mensajeria } from './../models/mensajeria.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MensajeriaService {

  constructor(private http: HttpClient) { }

}

