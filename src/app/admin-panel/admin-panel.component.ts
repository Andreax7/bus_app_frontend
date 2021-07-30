import { Component, OnInit  } from '@angular/core';
import { AuthService } from '../auth.service';
import { Dest } from '../admin-panel/dest';
import { AdminService } from '../admin-panel/admin.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  currentUser!: string | null;
  dest?: Dest[];
  showModal = false;
  destForm: FormGroup;
  dest_id: any;
  onedest: any;

  constructor(  private auth: AuthService, 
                private AdminService: AdminService, 
                private formBuilder: FormBuilder,
               ){
        
        
        this.destForm = this.formBuilder.group({
          dest_name: ['',],
          zone: ['',],
          line_no:['',],
          dfrom: ['',],
          dto: ['',],
      });
   }
  
  ngOnInit(){
    this.currentUser = localStorage.getItem('user');
    this.getmyData();
    this.allDest();
  }
  

  getmyData(){
    this.auth.admindata().subscribe(
      response =>{
        console.log(response);
      })
  }

  allDest() {
    this.AdminService.getDestinations().subscribe(
      res => {
        this.dest=res;
      },
      error =>{
        console.log(error);
      });
  }

  Activity(id: number, choice: any) {
    this.AdminService.EditDestination(id,choice).subscribe();
  }

  show(id: any){
    this.dest_id=id;
    this.AdminService.DestDetails(id).subscribe(
      res =>{
        this.onedest=res;
        this.showModal = true;
      }
    );  
  }
  hide(){
    this.showModal = false;
  }
  UpdateDest(id: number){
    this.AdminService.EditDestination(id,this.destForm.value).subscribe(
      res=>{
       
      }
    );
    
  }
  DeleteDest(id:number){ 
  }

}


