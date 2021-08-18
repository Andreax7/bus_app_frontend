import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import {BehaviorSubject , Observable, throwError} from 'rxjs';
import { Router } from '@angular/router';
import { Ticket, nonUser, Ttypes } from './tickets';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, public router: Router) {  
    
    this.httpOptions = {
      headers: new HttpHeaders({
                  'Accept': 'application/json',
                  'Access-Control-Allow-Origin': '*',
      }) 
    };
}

  sendUser(user:nonUser): Observable<nonUser>{
    return this.http.post<nonUser>('http://localhost:8000/' + 'nonusers/', user, this.httpOptions);
  }
  
  getTypes(): Observable<Ttypes[]>{
    return this.http.get<Ttypes[]>('http://localhost:8000/ttype/', this.httpOptions);
  }

  buyTicket(ticket: Ticket): Observable<Ticket>{
    return this.http.post<Ticket>('http://localhost:8000/buy_ticket/', ticket, this.httpOptions);
  }

}