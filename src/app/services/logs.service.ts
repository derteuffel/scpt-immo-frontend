import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

const host = environment.LOGS;

@Injectable({
  providedIn: 'root'
})
export class LogsService {

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

  

  findAllByUser(id:any):Observable<any>{
    return this.http.get(`${host}/user/${id}`,{headers: this.headers});
  }

  findAllByDate(date:any):Observable<any>{
    return this.http.get(`${host}/date?date=${date}`,{headers: this.headers});
  }
}
