import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TicketsService } from './tickets.service';
import { Ticket, nonUser } from './tickets';
import { NgxMatDatetimeInput } from '@angular-material-components/datetime-picker';

@Component({
  selector: 'app-get-ticket',
  templateUrl: './get-ticket.component.html',
  styleUrls: ['./get-ticket.component.css']
})
export class GetTicketComponent implements OnInit {
  
  public nUserForm: FormGroup;
  public TicketForm!: FormGroup;
  emailPattern = "^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  submited?: boolean;  
  user?: nonUser;
 
  
  constructor( private formB: FormBuilder,
               private TicketsService: TicketsService){
      
              this.nUserForm = this.formB.group({
                            firstname: ['', Validators.required],
                            lastname: ['', Validators.required ],                
                            email: ['',  [Validators.required, Validators.pattern(this.emailPattern)] ], 
               }) 
  }
  
  ngOnInit(){
    this.next();
   
  }

  next() {
    if(this.nUserForm.valid){
      this.TicketsService.sendUser(this.nUserForm.value).subscribe(
        (response)=>{
          this.user = response;
          console.log(this.user.id);
      });
    }
  }
}
