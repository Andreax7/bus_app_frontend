import { Component, OnInit  } from '@angular/core';
import { AuthService } from '../auth.service';
import { Dest, Time, Timetable } from '../admin-panel/dest';
import { Ttypes } from '../get-ticket/tickets';
import { AdminService } from '../admin-panel/admin.service';
import { TimetableService } from '../timetable/timetable.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  deptimes?: Time[];
  times2?: Time[];
  ticket_types?: Ttypes[];

  destForm!: FormGroup;
  delDepForm: FormGroup;
  AddDepartureForm: FormGroup;
  AddTimeForm: FormGroup;
  DelTimeForm: FormGroup;
  NewDestForm: FormGroup;
  NewTypeForm: FormGroup;
  ChangeTypeForm!: FormGroup;

  onedest: any;
  showModal = false;
  modalAdd = false;
  typeModal = false;
  showTimetable = false;
  er = '';
  eror = '';
  err = '';

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

          this.DelTimeForm = this.formBuilder.group({
            dest_name: ['',],
            departure: ['',],
          });

          this.AddDepartureForm = this.formBuilder.group({
            deptype: ['', Validators.required],
            departure: ['', Validators.required],
          });

          this.delDepForm = this.formBuilder.group({
            id: ['',],
          });
          this.NewTypeForm = this.formBuilder.group({
            tickettype: ['',],
            ticket_price: ['',],
            zone:['',]
          });
          this.ChangeTypeForm = this.formBuilder.group({
            active: ['',],
          });
  }

  ngOnInit(){
    this.currentUser = localStorage.getItem('user');
    this.allDest();
    this.showDepartures();
    this.getTypes(); 
  }

  hide(){
    this.showModal = false;
    this.modalAdd = false;
    this.typeModal = false;
  }

   openAddWindow(){
    this.modalAdd = true;
  }

  allDest(){
    this.AdminService.getDestinations().subscribe(
      res => {
        this.dest=res;
      });
  }

  editDest(id: any){
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

  //TICKET ADMINISTRATION
   
  showtypeModal(){
    this.typeModal = true;
  }

  getTypes(){
    this.AdminService.getTypes().subscribe(
      res=>{
        this.ticket_types = res;
      }
    );
  }

  onChange(id:any, value: any){
  //  console.log(id, value);
    if(value){
      value = {active: false};
      this.AdminService.deactivate(id, value).subscribe(
       // res=>{console.log(res);}
      );
    } 
    if(!value){
      value = {active: true};
      this.AdminService.deactivate(id, value).subscribe(
        //res =>{console.log(res);}
        );
    }
  }

  NewTicketType(){
    this.AdminService.addTicketType([this.NewTypeForm.value]).subscribe(
      res=>{
       // console.log(res);
        this.getTypes();
      }
    );

  }


  // TIMETABLE OF EACH DESTINATION
  showTable(id: number){ 
    this.showTimetable = true;
    this.AdminService.showTable(id).subscribe(
      res=>{
        this.timet = res;
      }
    ); 
  }

  NewTimetable(){
    this.AdminService.NewTimetable(this.AddTimeForm.value).subscribe(
      res=>{
        var did = this.AddTimeForm.value['dest_name'];
        this.showTable(did);
      },
      error =>{
        this.err = 'Error occured'
        console.log(error);
      }
    );
  }
  
  delTimetable(){
          var dnid = this.DelTimeForm.value['dest_name'];
          var depid = this.DelTimeForm.value['departure'];
          this.AdminService.deleteTimetable(dnid,depid).subscribe(
            res=>{
              console.log(res);
              this.showTable(dnid);
            },
            error =>{
              this.er = 'Departure for chosen timetable does not exist'
              this.showTable(dnid);
            }
          );
     
    }

  //Departures
  AddTime(){
    this.AdminService.AddDepartures(this.AddDepartureForm.value).subscribe();
    this.showDepartures();
    this.ngOnInit();
  }

  deleteTime(){
    var id = this.delDepForm.controls['id'].value;
    if (window.confirm('Are you sure you want to delete ?')){
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
    this.AdminService.deleteDepartures(id).subscribe(
      res=>{
        this.showDepartures();
      },
      error=>{
        this.eror = 'This time does not exist please refresh the page';
      }
    );
  }

}


