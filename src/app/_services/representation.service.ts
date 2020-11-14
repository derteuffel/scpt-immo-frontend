import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Representation} from '../model/representation';
import {Observable} from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class RepresentationService {
  private AUTH_API = 'http://localhost:8080/api/representation';
  constructor(private http: HttpClient) { }

  createRepresentation(rep: Representation): Observable<any>{
    return  this.http.post(`${this.AUTH_API}/save`, rep);
  }

  saveRepresentation(rep: Representation, id: number): Observable<any>{
    return this.http.post(`${this.AUTH_API}/${id}`, rep);
  }

  getRepresentation(id: number): Observable<any>{
    return this.http.get(`${this.AUTH_API}/${id}`);

  }

  deleteRepresentation(id: number): Observable<any>{
    return this.http.delete(`${this.AUTH_API}/delete/${id}`);
  }

  listRepresentation(): Observable<any>{
    return this.http.get(`${this.AUTH_API}`);
  }
}
