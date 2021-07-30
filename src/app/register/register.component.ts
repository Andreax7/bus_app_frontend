import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from './user';
import { AuthService } from '../auth.service';
import { PassMatchValidator } from './passMatch';




@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  public submitted = false;
  public Failed ='';
  unexists = '';
  emailcheck = '';
  registerForm!: FormGroup;
  emailPattern = "^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  passwordPattern = "^[A-Za-z0-9._*+-]{8,}$";
  PassMatch = '';

  constructor(public formBuilder: FormBuilder,
              private AuthService: AuthService) {
                this.registerForm = this.formBuilder.group({
                  username: ['', Validators.required ],  
                  first_name: ['', Validators.required],
                  last_name: ['', Validators.required ],                
                  email: ['',  [Validators.required, Validators.pattern(this.emailPattern)] ], 
                  password: ['', [Validators.required,  Validators.pattern(this.passwordPattern)], [PassMatchValidator('password', 'password2')]],
                  password2:['', [ Validators.required]],
                  role:[''],
              })
    
              }

  UsernameUnique() {
                var username = this.registerForm.controls['username'].value;
                this.AuthService.checkUsername(username)
                .subscribe(
                  response => {
                    if( response == 'true' ){
                      this.unexists = ' Username is taken ';
                    };
                    if( response == 'false' ){ 
                      this.unexists = ' ';
                    }
                  }
                );
              }

 submit() {
    if(this.registerForm.valid){
      this.AuthService.register(this.registerForm.value).subscribe(
        res => {
            console.log(res);
        },
        error =>{
          console.log(error);
        }
      );
      console.log('user added');
    }
  }

  ngOnInit() {

  }

  EmailUnique() {
    var email = this.registerForm.controls['email'].value;
    this.AuthService.checkEmail(email)
    .subscribe(
      response => {
        if( response == 'true' ){
          this.emailcheck = ' email is taken ';
        };
        if( response == 'false' ){ 
          this.emailcheck = ' ';
        }
      },
      error => {
        this.emailcheck = 'email is empty ';
      }        
    );
  }
}