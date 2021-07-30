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

  sendUser(user:nonUser){
    return this.http.post<nonUser[]>('http://localhost:8000/' + 'nonusers/', user, this.httpOptions)
      .pipe(
        tap(data =>
            console.log('All: ' + JSON.stringify(data)
            ))
      );
  }

}