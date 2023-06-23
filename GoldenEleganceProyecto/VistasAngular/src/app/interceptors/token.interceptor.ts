import { IResponseToken } from '../models/IResponseToken.interface';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { TokenApiModel } from '../models/Token-api.model';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authS: AuthService, private router: Router) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const myToken = this.authS.getToken();
    if (myToken) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${myToken}` }
      })
    }
    return next.handle(request).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            return this.handleUnAuthorizedError(request, next)
          }
        }
        return throwError(() => Error("Surguio un error inesperado"))
      })
    );
  }
  handleUnAuthorizedError(req: HttpRequest<unknown>, next: HttpHandler) {
    const tokeApiModel = new TokenApiModel();
    tokeApiModel.accessToken = this.authS.getToken() ?? "";
    tokeApiModel.refreshtoken = this.authS.getRefreshToken() ?? "";
    return this.authS.newRefreshToken(tokeApiModel)
      .pipe(
        switchMap((data: IResponseToken) => {
          this.authS.almacenarRefreshToken(data.refreshToken);
          this.authS.almacenarToken(data.token);
          req = req.clone({
            setHeaders: { Authorization: `Bearer ${data.token}` }
          })
          return next.handle(req);
        }),
        catchError((err) => {
          return throwError(() => {
            console.log(err.error)
            this.router.navigate(['login'])
          })
        })
      )
  }
}
