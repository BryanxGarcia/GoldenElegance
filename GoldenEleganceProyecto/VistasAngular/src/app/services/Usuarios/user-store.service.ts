import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
private username$ = new BehaviorSubject<string>("");
private role$ = new BehaviorSubject<string>("");

  public getRoleFromStore(){
    return this.role$.asObservable();
  }

  public setRoleFromStore(role:string){
    this.role$.next(role);
  }

  public getUsernameFromStore(){
    return this.username$.asObservable();   
  }

  public setUsernameFromStore(username:string){
    this.username$.next(username);
  }

}