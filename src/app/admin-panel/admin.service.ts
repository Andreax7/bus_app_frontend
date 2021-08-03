import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dest, Time } from '../admin-panel/dest';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private destUrl = 'http://localhost:8000/dests/';

  constructor(private http: HttpClient ) { 
    this.http = http;
  }

  getDestinations(): Observable <Dest[]>{
    return this.http.get<Dest[]>(`${this.destUrl}`);
}
   // return this.http.get<Dests[]>(baseUrl);
   DestDetails(id: any): Observable<Dest[]>{
    return this.http.get<Dest[]>(`${this.destUrl}${id}`);
}
  EditDestination(id: any, formData: any): Observable<Dest[]>{
    return this.http.put<Dest[]>(`${this.destUrl}${id}`,formData);
  }
  AddDestination(formData: any): Observable<Dest[]>{
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
  NewTimetable(formData: any){
    return this.http.post('http://localhost:8000/newtimetable/', formData);
  }
  showTable(id: number){
    return this.http.get('http://localhost:8000/newtimetable/');
  }

  deleteTimetable(id: number){
    return this.http.delete('http://localhost:8000/timetable/'+ id).subscribe(res=>console.log(res));
}
}

