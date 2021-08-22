import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dest, Time, Timetable } from '../admin-panel/dest';
import { Ttypes } from '../get-ticket/tickets';


@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private destUrl = 'http://localhost:8000/dests/';

  constructor(private http: HttpClient ) { 
    this.http = http;
  }

  getDestinations(): Observable<Dest[]>{
    return this.http.get<Dest[]>(`${this.destUrl}`);
}
   // return this.http.get<Dests[]>(baseUrl);
   DestDetails(id: any): Observable<Dest[]>{
    return this.http.get<Dest[]>(`${this.destUrl}${id}`);
}
  EditDestination(id: any, formData: any): Observable<Dest[]>{
    return this.http.put<Dest[]>(`${this.destUrl}${id}`,formData);
  }
  AddDestination(formData: any){
    return this.http.post<Dest[]>(`${this.destUrl}`, formData);
  } 

  getDepartures(): Observable <Time[]>{
    return this.http.get<Time[]>('http://localhost:8000/addept/');
}
  deleteDepartures(id: number): Observable <Time[]>{
    return this.http.delete<Time[]>('http://localhost:8000/deldep/'+ id);
}
  AddDepartures(formData: any): Observable <Time[]>{
  return this.http.post<Time[]>('http://localhost:8000/addept/', formData);
  
}
  NewTimetable(formData: any): Observable <Timetable[]>{
    return this.http.post<Timetable[]>('http://localhost:8000/newtimetable/', formData);
  }
 
  showTable(id: number): Observable<Timetable[]>{
    return this.http.get<Timetable[]>('http://localhost:8000/showtimetable/'+ id);
  }

  deleteTimetable(dnid: number, did:number){
    return this.http.delete('http://localhost:8000/deltimetable/' + dnid + '/'+ did);
  }

  getTypes():Observable<Ttypes[]>{
    return this.http.get<Ttypes[]>('http://localhost:8000/ttype/')

  }
  addTicketType(formData: any): Observable<Ttypes[]>{
    return this.http.post<Ttypes[]>('http://localhost:8000/ttype/',formData)
  }

  deactivate(id:any, formData: any): Observable<Ttypes[]>{
    return this.http.put<Ttypes[]>('http://localhost:8000/ticketactive/'+ id, formData);
  }

}
