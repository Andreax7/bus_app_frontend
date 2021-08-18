import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = request;
    const user = localStorage.getItem('user')!;
    if (user) {
      request = request.clone({
        setHeaders: {
          Authorization: `JWT ${user}`
        }
      });
    }
    if (!user) {
      request = request.clone({
        setHeaders: {
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': '*',
}      });
    }

    return next.handle(request);
  }
}