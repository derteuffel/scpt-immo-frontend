import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

const host = environment.OCCUPATION;

@Injectable({
  providedIn: 'root'
})
export class OccupationService {

  currentUser: User;
  headers: HttpHeaders;
  formHeaders: HttpHeaders;
  
  constructor(private http: HttpClient) {

    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.headers = (this.currentUser==null || this.currentUser == undefined) ? new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8'
    }):new HttpHeaders({
      authorization: 'Bearer ' + this.currentUser.token,
      'Content-Type': 'application/json; charset=UTF-8'
    });

    this.formHeaders = (this.currentUser==null || this.currentUser == undefined) ? new HttpHeaders({}):new HttpHeaders({
      authorization: 'Bearer ' + this.currentUser.token,
      
    });
   }

  findAll():Observable<any>{
    return this.http.get(`${host}`,{headers: this.headers});
  }

  save(form:any,id:any):Observable<any>{
    return this.http.post(`${host}/${id}`, form,{headers: this.headers});
  }

  update(form:any, id:any):Observable<any>{
    return this.http.put(`${host}/${id}`, form,{headers: this.headers});
  }

  findOne(id:any):Observable<any>{
    return this.http.get(`${host}/${id}`,{headers: this.headers});
  }

  findAllByLocale(id:any):Observable<any>{
    return this.http.get(`${host}/locale/${id}`,{headers: this.headers});
  }

  findAllByLocaleAndStatus(id:any, status:any):Observable<any>{
    return this.http.get(`${host}/locale/status/${id}/${status}`,{headers: this.headers});
  }

  
  delete(id:any):Observable<any>{
    return this.http.delete(`${host}/${id}`,{headers: this.headers});
  }
}
