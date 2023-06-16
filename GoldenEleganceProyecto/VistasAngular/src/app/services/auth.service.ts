import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { IResponse } from '../models/IResponse.interface';
import { IResponseToken } from '../models/IResponseToken.interface';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.serverUrl;
  private controller: string = '/api/Authentication';

  constructor(private http: HttpClient, private router: Router) { }


  registrarse(FormRegistro: FormGroup){
     return this.http.post<IResponse>(`${this.baseUrl}${this.controller}/Registro`, FormRegistro);
  }

  iniciarSesion(FormInicio: FormGroup){
    return this.http.post<any>(`${this.baseUrl}${this.controller}/Login`, FormInicio);
  }

  almacenarToken(tokenValue: string){
    localStorage.setItem('token', tokenValue)
  }

  signOut(){
    localStorage.clear();
    this.router.navigate(['login'])
  }

  getToken(){
    return localStorage.getItem('token')
  }

  isLoggedIn():boolean{
    return !!localStorage.getItem('token')
  }
}