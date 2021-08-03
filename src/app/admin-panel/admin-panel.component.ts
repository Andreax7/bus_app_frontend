import { Component, OnInit  } from '@angular/core';
import { AuthService } from '../auth.service';
import { Dest, Time, Timetable } from '../admin-panel/dest';
import { AdminService } from '../admin-panel/admin.service';
import { TimetableService } from '../timetable/timetable.service';
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
  times?: Timetable[];
  times2?: Time[];

  destForm!: FormGroup;
  delDepForm: FormGroup;
  AddDepartureForm: FormGroup;
  AddTimeForm: FormGroup;
  NewDestForm: FormGroup;

  onedest: any;
  showModal = false;
  modalAdd = false;
  showTimetable = false;
  showTime = true;
  
  

  constructor(  private auth: AuthService, 
                private AdminService: AdminService, 
                private formBuilder: FormBuilder,
                private router: Router,
                private TimetableService: TimetableService,
               ){
        
    this.NewDestForm = this.formBuilder.group({
        dest_name: ['',],
        zone: ['',],
        line_no:['',],
        dfrom: ['',],
        dto: ['',],
        active: ['',],
    });

    this.destForm = this.formBuilder.group({
      dest_name: ['',],
      zone: ['',],
      line_no:['',],
      dfrom: ['',],
      dto: ['',],
      active: ['',],
  });

  this.AddTimeForm = this.formBuilder.group({
    dest_name: ['',],
    departure: ['',],
  });

  this.AddDepartureForm = this.formBuilder.group({
    deptype: ['',],
    departure: ['',],
  });

  this.delDepForm = this.formBuilder.group({
    id: ['',],
  });

  }
  
  ngOnInit(){
    this.currentUser = localStorage.getItem('user');
    this.getmyData();
    this.allDest();
    this.showDepartures();
    
  }

  openAddWindow(){
    this.modalAdd = true;
  } 
  hide(){
    this.showModal = false;
    this.modalAdd = false;
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

  show(id: any){
    this.AdminService.DestDetails(id).subscribe(
      res =>{
        this.onedest=res;
        this.showModal = true;
      }
    );  
  }

  showDepartures(){
    this.AdminService.getDepartures().subscribe(
      res =>{
        this.times2 = res;
      }
    );  
  }

  showTable(id: any){
    this.TimetableService.getDetails(id).subscribe(
      res =>{
        this.times = res;
      }
    );  
  }
  OpenTimetable(){
    if(this.showTimetable) return this.showTimetable = false;
    else return this.showTimetable = true;
  }
  AddTimetable(){
    this.AdminService.NewTimetable(this.AddTimeForm.value).subscribe(
    )
  }
  deleteTimetable(id: any){
    this.AdminService.deleteTimetable(id);
  }



  AddTime(){
    this.AdminService.AddDepartures(this.AddDepartureForm.value).subscribe(
      res =>{  
      }
    );  
  }



  deleteTime(){
    var id = this.delDepForm.controls['id'].value;
    alert('Are You sure You want to delete ? <button value="no">NO</button>');
    this.DeleteDest(id);
  }


  UpdateDest(id: number){
    this.AdminService.EditDestination(id,this.destForm.value).subscribe(
      res=>{
        this.showModal = false;
      }
    );
  }
  AddDest(){
    this.AdminService.AddDestination(this.NewDestForm.value).subscribe(
      res=>{
        console.log(res);
        this.modalAdd = false;
      }
    );
  }
  DeleteDest(id:number){ 
    this.AdminService.deleteDepartures(id).subscribe(
      res=>{
        console.log(res);
        window.location.reload;
      }
    );
  }

}


