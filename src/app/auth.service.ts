import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import {BehaviorSubject , Observable, throwError} from 'rxjs';
import { Router } from '@angular/router';
import { User } from './register/user';




@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private httpOptions = {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  private UserSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  public token!: any;
  public username?:string;
  public errors: any = [];
  public token_expires!: Date;
  private  headers = new HttpHeaders({'Content-Type': 'application/json',
                              'Access-Control-Allow-Origin': '*',
                              'Authorization':'JWT '+ localStorage.getItem("user")});



  constructor(private http: HttpClient, public router: Router) {
    
      this.UserSubject = new BehaviorSubject<User>(null!);
      this.user = this.UserSubject.asObservable();

      this.httpOptions = {
        headers: new HttpHeaders({
                    'Accept': 'application/json',
                    'Access-Control-Allow-Origin': '*',
        }) 
      };
  }

  static isLoggedIn() {
    if(localStorage.getItem('user')=== null)
      return false;
    else 
      return true;
  }

// ********Verification******
  checkUsername(username:string): Observable<any> {
   return this.http.get('http://localhost:8000/checkuser/' + username);
  }

  checkEmail(email:string): Observable<any> {
    return this.http.get('http://localhost:8000/checkmail/' + email);
   }
// ***Verification*****
  register(user: User): Observable<User> {
    return this.http.post<User>('http://localhost:8000/' + 'register/', user, this.httpOptions);
  }

  login(username:string, password:string){
    return this.http.post<User>('http://localhost:8000/auth/',{username,password}, this.httpOptions);
  };

  verifyLogin(token:string){
    return this.http.post<User>('http://localhost:8000/verify/', {token} ,  {headers:this.headers, withCredentials:true})
    .subscribe(
      data => {
        localStorage.setItem("user",data['token']); // stores given JWT token in localStorage
        this.router.navigateByUrl('/profile');
      },
      err => {
        this.errors = err.error;
      }
     
    );
  }
  
  // Handle errors
   handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
  
  myprofiledata(): Observable<User[]>{
    return this.http.get<User[]>('http://localhost:8000/myprofile/', {headers:this.headers, withCredentials:true} ).pipe(map(res => res))
  }

  admindata(){
    return this.http.get('http://localhost:8000/moderator/', {headers:this.headers, withCredentials:true})
  }

  isadmin(){
    return this.http.get('http://localhost:8000/isstaff/', {headers:this.headers, withCredentials:true})
  }

  // After clearing localStorage redirect to login screen
  logout(){
    localStorage.removeItem("user");
    localStorage.clear();
    return this.router.navigate(['/home']);
  }

  upload(formData: any){
    return this.http.post<any>('http://localhost:8000/upload/', formData);
  }

  getAuthToken(){
    return this.http.post<User>('http://localhost:8000/refresh/', {headers:this.headers, withCredentials:true} )
    .pipe(
      map(res => {
        if (res){
          this.UserSubject.next(res);
          localStorage.setItem("user",res["token"]);
          console.log(res["token"]);

        }
      }),
    );
  }


  private refreshTokenTimeout: any;
  private startRefreshTokenTimer() {
    // parse json object from base64 encoded jwt token
    const jwtToken = JSON.parse(atob(localStorage.getItem("user")!.split('.')[1]));

    // set a timeout to refresh the token a minute before it expires
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - (60 * 1000);
    this.refreshTokenTimeout = setTimeout(() => this.getAuthToken().subscribe(), timeout);
}



}

