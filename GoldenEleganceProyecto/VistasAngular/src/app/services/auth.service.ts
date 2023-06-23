import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { IResponse } from '../models/IResponse.interface';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenApiModel } from '../models/Token-api.model';
import { IResponseToken } from '../models/IResponseToken.interface';
import { ResetPassword } from '../models/reset-password.model';
import { ConfirmarEmail } from '../models/confirmarEmail.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.serverUrl;
  private controller: string = '/api/Authentication';
  private userPayload: any;
  constructor(private http: HttpClient, private router: Router) {
    this.userPayload = this.decodedToken();
  }


  registrarse(FormRegistro: FormGroup) {
    return this.http.post<IResponse>(`${this.baseUrl}${this.controller}/Registro`, FormRegistro);
  }

  iniciarSesion(FormInicio: FormGroup) {
    return this.http.post<any>(`${this.baseUrl}${this.controller}/Login`, FormInicio);
  }

  almacenarToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue)
  }
  getToken() {
    return localStorage.getItem('token')
  }

  almacenarRefreshToken(tokenValue: string) {
    localStorage.setItem('refreshToken', tokenValue)
  }
  getRefreshToken() {
    return localStorage.getItem('refreshToken')
  }
  signOut() {
    localStorage.clear();
    this.router.navigate(['login'])
  }

  

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token')
  }

  decodedToken() {
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    return jwtHelper.decodeToken(token);
  }

  getUsernameFromToken() {
    if (this.userPayload)
      return this.userPayload.name;
  }

  getRolFromToken() {
    if (this.userPayload)
      return this.userPayload.role;
  }

  newRefreshToken(tokenApi: TokenApiModel) {
    return this.http.post<IResponseToken>(`${this.baseUrl}${this.controller}/RefreshToken`, tokenApi);
  }

  sendResetPassword(email: string){
    return this.http.post<any>(`${this.baseUrl}${this.controller}/send-reset-email/${email}`, {});
  }

  resetPassword(resetPasswordObj: ResetPassword){
    return this.http.post<IResponse>(`${this.baseUrl}${this.controller}/reset-password`, resetPasswordObj);
  }

  confirmarCuenta(confirmarObj: ConfirmarEmail){
    return this.http.post<IResponse>(`${this.baseUrl}${this.controller}/confirmarCorreo`, confirmarObj);
  }

}