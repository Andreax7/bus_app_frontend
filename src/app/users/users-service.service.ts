import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { nonUser, Ticket } from '../get-ticket/tickets';
import { Employees, User } from '../register/user';
import { Subscription, SubTypes } from './subscription';

@Injectable({
  providedIn: 'root'
})
export class UsersServiceService {
  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};
  
  constructor(private http: HttpClient, public router: Router) { }

  getnonUser(): Observable<nonUser[]>{
      return this.http.get<nonUser[]>(`http://localhost:8000/nonusers/`);
  }
  getnuTicket(nuid: number): Observable<Ticket[]>{
    return this.http.get<Ticket[]>(`http://localhost:8000/nuticket/`+ nuid);
  }
  soldTicketsPerType(tid: number): Observable<[]>{
    return this.http.get<[]>(`http://localhost:8000/soldtickets/`+tid);
  }

  AllProfiles(): Observable<Employees[]>{
    return this.http.get<Employees[]>(`http://localhost:8000/allprofiles/`);
  }

  ProfileTickets(pid: number): Observable<Ticket[]>{
    return this.http.get<Ticket[]>(`http://localhost:8000/profiletic/`+ pid);
  }

  setEmployee(id: any, value:  any): Observable<Employees[]>{
    return this.http.put<Employees[]>('http://localhost:8000/setemploy/'+ id, value);
  }

  userSubs(id: any): Observable<Subscription[]>{
    return this.http.get<Subscription[]>('http://localhost:8000/getusersub/'+ id);
  }
  
  getUsrSub(id: any): Observable<Subscription[]>{
    return this.http.get<Subscription[]>('http://localhost:8000/editsub/'+ id);
  }

  editUsrSubs(id: any, FormData: any): Observable<Subscription[]>{
    return this.http.put<Subscription[]>('http://localhost:8000/editsub/'+ id, FormData);
  }

  SubTypes(): Observable<SubTypes[]>{
    return this.http.get<SubTypes[]>('http://localhost:8000/allsubs/');
  }

  addSubType(formData: any): Observable<SubTypes>{
    return this.http.post<SubTypes>('http://localhost:8000/allsubs/', formData);
  }

  SubTypesEdit(id: any, value: any): Observable<SubTypes[]>{
    return this.http.put<SubTypes[]>('http://localhost:8000/editsubtype/'+ id, value);
  }

  soldSubPerType(id: number): Observable<[]>{
    return this.http.get<[]>(`http://localhost:8000/soldsubs/`+ id);
  }

}
