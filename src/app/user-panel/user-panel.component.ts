import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';
import { User } from '../register/user'

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css']
})
export class UserPanelComponent implements OnInit {
  currentUser: any;
  user: any;
  myinfo = false;
  form!: FormGroup;
  response: any;
  imageURL: any;
  isadmin = false;

  constructor( private formBuilder: FormBuilder, private auth: AuthService ) {
    this.isAdm();
  }

  ngOnInit(): void{
    this.currentUser = localStorage.getItem('user');
    this.getmyData();
    this.form = this.formBuilder.group({
      profile: ['']
    });
  }
 
  isAdm(){
    this.auth.isadmin().subscribe(
      response =>{  
        if(response!==false) {this.isadmin = true;}
        else {this.isadmin = false;}
      }
    );
 }

  onChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('profile')?.setValue(file);
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.form.get('profile')?.value);

    this.auth.upload(formData).subscribe(
      (res) => {
        this.response = res;
        this.imageURL = `${'http://localhost:8000/'}${res.file}`;
        console.log(res);
        console.log(this.imageURL);
      },
      (err) => {  
        console.log(err);
      }
    );
  }


 getmyData(){
   this.auth.myprofiledata().subscribe(
     response =>{
       this.user=response; 
     }
   );
 }
}


