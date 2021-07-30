import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { TicketsService } from './tickets.service';
import { Ticket, nonUser } from './tickets';
import { Observable } from 'rxjs';
import { NgxMatDatetimeInput } from '@angular-material-components/datetime-picker';

@Component({
  selector: 'app-get-ticket',
  templateUrl: './get-ticket.component.html',
  styleUrls: ['./get-ticket.component.css']
})
export class GetTicketComponent implements OnInit {
  
  public TicketForm: FormGroup;
  emailPattern = "^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  submited?: boolean;  
  public user: any = []
  
  constructor( private formB: FormBuilder,
                private TicketsService: TicketsService) {
    this.TicketForm = this.formB.group({
    firstname: ['', Validators.required],
    lastname: ['', Validators.required ],                
    email: ['',  [Validators.required, Validators.pattern(this.emailPattern)] ], 
  }) 
  }
  
  ngOnInit(): void {
    this.next();
   
  }

  next() {
    if(this.TicketForm.valid){
      this.TicketsService.sendUser(this.TicketForm.value).subscribe(
        (response)=>{
          this.user = response;
          console.log(this.user);
      });
      console.log('user added');
    }
  }
}
