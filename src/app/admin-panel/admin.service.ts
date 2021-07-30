import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dest } from '../admin-panel/dest';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private destUrl = 'http://localhost:8000/dests/';

  constructor(private http: HttpClient, private router: Router ) { 
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
    return this.http.put<Dest[]>(`${this.destUrl}${id}`,formData).pipe(
      
      );
  } 
 
}

