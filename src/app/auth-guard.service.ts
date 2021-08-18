import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService  implements CanActivate  {

  constructor(public router: Router, public AuthService: AuthService) { }
 
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if(!AuthService.isLoggedIn()){
      this.router.navigateByUrl("/home");
      alert('You are not logged in');    
      return false;
    }
    if(!AuthService.tokenExp()) { //returns false if token IS expired
        this.AuthService.refreshToken().subscribe();
        return true;
    } 
  
    else{
      return true;
    }
      
  }


        
  
}
