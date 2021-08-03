
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent implements OnInit {
  
  loginForm: FormGroup;
  showModal = false;
  submitted = false;
  public unexists!: string;
  error = '';
  token = '';
  adminnav?: boolean;

  constructor( private formBuilder: FormBuilder,
              public authService: AuthService, 
              public router: Router
  ){       
          this.loginForm = this.formBuilder.group({
          username: ['',  [Validators.required]],
          password: ['', [Validators.required]]
          });
          if(this.isLogin()){
            this.isadmin();
            
           }
  }

 ngOnInit() { 
  
  }

  isadmin(){
    this.authService.isadmin().subscribe(
      response =>{  
        if(response =='true'){this.adminnav = true; }
        else{this.adminnav = false;}
      }
    );
    
  }

  show(){
    this.showModal = true;
  }
  hide(){
    this.showModal = false;
  }

 isLogin(){  
   if(localStorage.getItem('user')=== null)
          return false;
    else 
          return true;
    }
  logout(){
    this.authService.logout();
    window.location.reload();
  }

  UsernameUnique() {
    var username = this.loginForm.controls['username'].value;
    this.authService.checkUsername(username)
    .subscribe(
      response => {
        if( response == 'true' ){
          this.unexists = ' ';
        };
        if( response === 'false' ){ 
          this.unexists = 'User does not exist';
          this.loginForm.controls.username.setErrors({'invalid': true});
        }
      }
    );
  }
  
  submit() {
    const username = this.loginForm.controls['username'].value;
    const password = this.loginForm.controls['password'].value;
    if(this.loginForm.valid)
      {
        this.authService.login(username, password).subscribe(
          response => {
            this.token = response['token'];
            this.authService.verifyLogin(this.token);
          },
          err => {
            this.loginForm.controls.password.setErrors({'invalid': true})
            this.error = 'Wrong password';
          }
         
        );         
      }
   }
  
}