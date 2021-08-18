import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TicketsService } from './tickets.service';
import { Ticket, nonUser, Ttypes } from './tickets';
import {jsPDF} from 'jspdf';
import html2canvas from 'html2canvas';



@Component({
  selector: 'app-get-ticket',
  templateUrl: './get-ticket.component.html',
  styleUrls: ['./get-ticket.component.css']
})
export class GetTicketComponent implements OnInit {

  public uid?: number;
  public nUserForm: FormGroup;
  public TicketForm!: FormGroup;
  emailPattern = "^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  submited?: boolean;  
  ticketsubm?: boolean; 
  user!: nonUser;
  ticket_types!: Ttypes[];
  ticket!: Ticket;

 
  
  constructor( private formB: FormBuilder,
               private TicketsService: TicketsService){
      
              this.nUserForm = this.formB.group({
                            firstname: ['', Validators.required],
                            lastname: ['', Validators.required ],                
                            email: ['',  [Validators.required, Validators.pattern(this.emailPattern)] ], 
              }) 
              this.TicketForm = this.formB.group({
                non_users_id: ['', Validators.required],
                ticket_types_id:['', Validators.required],
                validfrom: ['' , Validators.required],
                amount: ['', Validators.required],                
              }) 
  }
  
  ngOnInit(){
    this.getTypes();
   
  }
  getTypes(){
    this.TicketsService.getTypes().subscribe(
      next =>{
       this.ticket_types = next;
      }
    )
  }

  next() {
    if(this.nUserForm.valid){
      this.TicketsService.sendUser(this.nUserForm.value).subscribe(
        (response)=>{
          this.user = response;
          this.submited = true;
          this.uid = this.user.id;
          if(this.uid){
            this.TicketForm.get('non_users_id')?.setValue(this.uid);
          }    
      });
    }
  }
  submitTicket(){
    if(this.TicketForm.valid){
      this.TicketsService.buyTicket(this.TicketForm.value).subscribe(
        res=>{
          this.ticketsubm = true;
          this.ticket=res;
          
        }
      )}
  }
  
  SavePDF(){
     let data = document.getElementById('content'); 
     console.log(data); 
     if(data){
      html2canvas(data).then(canvas => {
          let docWidth = 208;
          let docHeight = canvas.height * docWidth / canvas.width;
          const contentDataURL = canvas.toDataURL('image/png')
          let doc = new jsPDF('p', 'mm', 'a4');
          let position = 0;
          doc.addImage(contentDataURL, 'PNG', 0, position, docWidth, docHeight)
          
          doc.save('exportedPdf.pdf');
      }); 
    }
  }

  }






