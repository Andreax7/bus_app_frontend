import { Component, OnInit } from '@angular/core';
import { UsersServiceService } from './users-service.service';
import {Ticket, nonUser,Ttypes } from '../get-ticket/tickets';
import { TicketsService } from '../get-ticket/tickets.service';
import { Employees, User } from '../register/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, SubTypes } from './subscription';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  nonUser!: nonUser[];
  nuTicket!: Ticket[];
  ticket_types!: Ttypes[];
  total: Array<any>= []; // for passing server response from counting tickets
 
  shownuTickets = false;
  showSubs = false;
  showModal = false;  //Modal for user subscription editing
  subModal = false;   //Modal for making new subscription type

  Profiles!: Employees[];
  SubTypes!: SubTypes[]; 
  total2: Array<any>= [];  // for passing server response from counting subscriptions

  EditUserSubForm!: FormGroup;
  NewTypeForm!: FormGroup;
  userSub!: any;
  userSubs!: any;


  constructor(private userServ: UsersServiceService, private ticketService: TicketsService,
              private formBuilder: FormBuilder,) {

            this.EditUserSubForm = this.formBuilder.group({
              id: ['',],
              date_ordered: ['',],
              discount: ['',],
              Profiles_id:['',],
              subscription_types_id: ['',],
          });

          this.NewTypeForm = this.formBuilder.group({
            id: ['',],
            subtype: ['',],
            subprice: ['',],
            year:['',],
            active: ['',],
            zone:['',],
        });
   }

  ngOnInit(){
    this.getUsers();
    this.getTTypes();
    this.AllProfiles();
    this.AllSubTypes();
    
  }

  hide(){
    this.showModal = false;
    this.subModal = false;
  }
  
  getUsers(){
    this.userServ.getnonUser().subscribe(
      response =>{this.nonUser=response;}
    );
  }

  seeTicket(id: any){
    this.userServ.getnuTicket(id).subscribe(
      response=>{
        this.nuTicket=response; 
        this.shownuTickets=true;
      }
    );
  }

// _________________FOR TICKET STATISTICS__________________ 
    getTTypes(){
      this.ticketService.getTypes().subscribe(
        next =>{
          this.ticket_types = next; 
          for(let id in next){ //gets the id from the dict response
              this.soldTickets(next[id]['id']);
          }  
        }
      );
    }

    soldTickets(id:any){  // utility function for ticket count -server handles counting tickets in db
        this.userServ.soldTicketsPerType(id).subscribe(
          res =>{
            this.total.push(res); 
            if(NaN){
              this.total.push(0);
            }           
          } 
        ); 
    }

// _________________PROFILE AND SUBSCRIPTTION MANAGMENT__________________ 
    AllProfiles(){
      this.userServ.AllProfiles().subscribe(
        res=> {
          this.Profiles = res;
        }
      );
    }
    onChange(id:any, value: any){ // set user as emplyee or not
      //  console.log(id, value);
        if(value){
          value = {"is_staff": false};
          this.userServ.setEmployee(id, value).subscribe(// res=>{console.log(res);}
          ); 
        } 
        if(!value){
          value = {"is_staff": true};
          this.userServ.setEmployee(id, value).subscribe(//res =>{console.log(res);}
            );
        }
      }

    UserActivity(id:any, value: any){ // Deactivate/Activate users profile
      //  console.log(id, value);
        if(value){
          value = {"is_active": false};
          this.userServ.setEmployee(id, value).subscribe(
           // res=>{console.log(res);}
          );
        } 
        if(!value){
          value = {"is_active": true};
          this.userServ.setEmployee(id, value).subscribe(
            //res =>{console.log(res);}
            );
        }
      }

// _________________SUBSCRIPTTION TYPE MANAGMENT__________________ 
    AllSubTypes(){
      this.userServ.SubTypes().subscribe(
        res=>{
          this.SubTypes = res;
          for(let id in res){ //gets the id from the dict response  this.soldSubsrciptions
              this.soldSubsrciptions(res[id]['id']);
          }  
        }
      )
    }

    soldSubsrciptions(id:any){ // Subscriptions per type
      this.userServ.soldSubPerType(id).subscribe(
        res =>{
          this.total2.push(res); 
          if(NaN){
            this.total2.push(0);
          }           
        } 
      );
    }

    showtypeModal(){
      this.subModal = true;
    }

    NewSubscriptionType(){ // Function for form inside modal
      if(this.EditUserSubForm.valid){     
        this.userServ.addSubType(this.NewTypeForm.value).subscribe(
          res=>{
            this.subModal = false;
            this.ngOnInit();
          }
        );
      }
    }

    changeSubType(id: any, value: any){ // activate/ deactivate subscription type
      if(value){
        value = {active: false};
        this.userServ.SubTypesEdit(id, value).subscribe(
          res=>{//console.log(res);
            this.AllSubTypes();          
          }
        );
      } 
      if(!value){
        value = {active: true};
        this.userServ.SubTypesEdit(id, value).subscribe(
          res =>{//console.log(res);
            this.AllSubTypes();
          }
        );
      }

    }

    getUserSubs(id:any){ // get list of one users subsscriptions
      this.userServ.userSubs(id).subscribe(
        res =>{
          this.userSubs = res;
          this.showSubs = true;
        }
      );  
    }

    OpenEditSub(id:number){ // open modal for one subscription -get data to edit
      this.userServ.getUsrSub(id).subscribe(        
        res =>{
          this.userSub = res;
      }
    ); 
      this.showModal = true;  
    }


    EditUserSub(id: number){  // inside modal -submit form
      if(this.EditUserSubForm.valid){     
        this.userServ.editUsrSubs(id,this.EditUserSubForm.value).subscribe(
          res=>{
            this.showModal = false;
            this.ngOnInit();
          }
        );
      }
    }


}
