import { Component, OnInit  } from '@angular/core';
import { AuthService } from '../auth.service';
import { Dest, Time, Timetable } from '../admin-panel/dest';
import { AdminService } from '../admin-panel/admin.service';
import { TimetableService } from '../timetable/timetable.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})


export class AdminPanelComponent implements OnInit {
  currentUser!: string | null;
  dest?: Dest[];
  timet?: Timetable[];
  deptimes?:Time[];
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
      });
  }

  show(id: any){
    this.AdminService.DestDetails(id).subscribe(
      res =>{
        this.onedest = res;
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

  showTable(id: number){ 
    this.showTimetable = true;
    this.AdminService.showTable(id).subscribe(
      res=>{
        this.timet = res;
      }
    ); 
  }
 // Timetable of each destination
 onSubmit(): void{
  var buttonName = document.activeElement!.getAttribute("name");
  if(buttonName == 'add')
  {
    this.NewTimetable();
  }
  if(buttonName == 'delete')
  {
    this.deleteTimetable(this.AddTimeForm.value);
  }

 }

  NewTimetable(){
    this.AdminService.NewTimetable(this.AddTimeForm.value).subscribe(
      res=>{
        var frm = res;
        console.log(frm[1]);

      },
      error =>{
        console.log('error');
      }
    );
  }
  
  deleteTimetable(form: any){
      this.AdminService.deleteTimetable(form).subscribe(
        res =>{
          console.log(res);
        }
      );
    }

  //Departures
  AddTime(){
    this.AdminService.AddDepartures(this.AddDepartureForm.value).subscribe();
    this.ngOnInit();
  }
  deleteTime(){
    var id = this.delDepForm.controls['id'].value;
    if (window.confirm('Are you sure you want to delete ?')==true){
        this.DeleteDepart(id);
    }
  }


  UpdateDest(id: number){
    this.AdminService.EditDestination(id,this.destForm.value).subscribe(
      res=>{
        this.showModal = false;
        this.ngOnInit();
      }
    );
  }
  AddDest(){
    this.AdminService.AddDestination(this.NewDestForm.value).subscribe(
      res => {
        this.ngOnInit();
      });
    this.modalAdd = false;
  }

  DeleteDepart(id:number){ 
    this.AdminService.deleteDepartures(id);
    this.ngOnInit();
  }

}


