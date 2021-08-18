import { Injectable, ɵstringify } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import {BehaviorSubject , Observable, throwError} from 'rxjs';
import { Router } from '@angular/router';
import { User } from './register/user';
import jwt_decode from 'jwt-decode';


var decoded: any;

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private httpOptions = {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  private UserSubject: BehaviorSubject<User>;
  public user: Observable<User>;
  private token = '';
  public username?: string;
  public errors: any = [];
  private  headers = new HttpHeaders({'Content-Type': 'application/json',
                              'Access-Control-Allow-Origin': '*',
                              'Authorization':'JWT '+ localStorage.getItem("user")});



  constructor(private http: HttpClient, public router: Router) {
    
      this.UserSubject = new BehaviorSubject<User>(null!);
      this.user = this.UserSubject.asObservable();
      this.token = ɵstringify(localStorage.getItem('user'));

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
  checkUsername(username:string) {
   return this.http.get('http://localhost:8000/checkuser/' + username);
  }

  checkEmail(email:string) {
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
      //  this.isadmin().subscribe(
       //   res=>{
     //         if(res=='true') return this.router.navigate(['/admin']);}); 
        this.router.navigate(['/profile']);
      },
      err => {
        this.errors = err.error;
        this.router.navigate(['/profile']);
      }
     
    );
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
    this.router.navigate(['/home']);
  }

  upload(formData: any){
    return this.http.post<any>('http://localhost:8000/upload/', formData);
  }

 static tokenExp(): boolean {
    var token = ɵstringify(localStorage.getItem("user"));
    decoded = jwt_decode(token); // get the token payload
    const expiryTime = decoded.exp; // get token expiration time
    return ((1000 * expiryTime) - (new Date()).getTime()) > 3000000; //triggers the refreshToken function in auth-guard service
  }

  refreshToken(){
    this.token = ɵstringify(localStorage.getItem("user"));
    decoded = jwt_decode(this.token);
  //  console.log(decoded);
    var orig = decoded.orig_iat;
    return this.http.post<User>('http://localhost:8000/refresh/',{token:this.token,orig_iat:orig},{headers:this.headers, withCredentials:true} )
    .pipe(
      map(res => {
        if (res){
          this.UserSubject.next(res);
          localStorage.clear();
          localStorage.setItem("user",res["token"]);
          console.log(res["token"], ' refreshed token');
        }
      }),
    );
  }

}

