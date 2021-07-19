import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import {BehaviorSubject , Observable, throwError} from 'rxjs';
import { Router } from '@angular/router';
import { User } from './register/user';
import { CookieService } from 'ngx-cookie';
import { tokenName } from '@angular/compiler';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  csrf!: string;

  constructor(private http: HttpClient, public router: Router, private cookieService: CookieService) {
    let csrf = this.cookieService.get("csrftoken");// get csrf token from the cookie
    let tokenName = localStorage.getItem("access_token")!;
    if (typeof(csrf) === 'undefined') { 
      csrf = '';
    }
    this.httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'X-CSRFToken': csrf,
        'access_token': tokenName,
      }), //add value of csrf into the HttpHeaders
    };
  }

  checkUsername(username:string): Observable<any> {
   return this.http.get('http://localhost:8000/checkuser/' + username);
  }

  checkEmail(email:string): Observable<any> {
    return this.http.get('http://localhost:8000/checkmail/' + email);
   }

  register(user: User): Observable<User> {
    return this.http.post<User>('http://localhost:8000/' + 'register/', user, this.httpOptions);
  }

  login(username:string, password:string): Observable<User> {
    return this.http.post<User>('http://localhost:8000/' + 'login/',{username,password}, this.httpOptions);
  }

  getAuthToken(username:string, password:string) {
    return this.http.post<User>('http://localhost:8000/auth/', {username,password}, this.httpOptions).pipe(
      map(token => {
        if (token){
          localStorage.setItem("user", token.token);
        }
      }),
    );
  }

  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
}

}

