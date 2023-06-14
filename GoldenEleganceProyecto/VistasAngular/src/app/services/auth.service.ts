import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl:string = "https://localhost:44397/api/Authentication/"
  constructor(private http: HttpClient, private router: Router) { }


  signUp(userObj: any){
     return this.http.post<any>(`${this.baseUrl}Registro`, userObj);
  }

  login(userLog: any){
    return this.http.post<any>(`${this.baseUrl}Login`, userLog);
  }

  storeToken(tokenValue: string){
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