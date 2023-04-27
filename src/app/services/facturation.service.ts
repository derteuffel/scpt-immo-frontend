import { Injectable } from '@angular/core';
import {User} from "../models/user";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../auth/auth.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FacturationService {

  currentUser: User;
  headers: HttpHeaders;
  formHeaders: HttpHeaders;

  constructor(private http: HttpClient,private authService:AuthService) {


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
    return this.http.get(`${host}/all`,{headers: this.headers});
  }

  save(form:any):Observable<any>{
    return this.http.post(`${host}/save`, form,{headers: this.headers});
  }

  update(form:any):Observable<any>{
    return this.http.put(`${host}/update`, form,{headers: this.headers});
  }

  findOne(id:any):Observable<any>{
    return this.http.get(`${host}/findOne/${id}`,{headers: this.headers});
  }

  findAllByRaisonSocial(value:any):Observable<any>{
    return this.http.get(`${host}/raisonSocial/${value}`,{headers: this.headers});
  }

  findAllByActivite(activite:any):Observable<any>{
    return this.http.get(`${host}/activite/${activite}`,{headers: this.headers});
  }
  findAllByOccupation(id:any):Observable<any>{
    return this.http.get(`${host}/occupation/${id}`,{headers: this.headers});
  }
  findAllByStatusAndOccupation(status:any,id:any):Observable<any>{
    return this.http.get(`${host}/status/${status}/occupation/${id}`,{headers: this.headers});
  }

  findAllByEmail(email:any):Observable<any>{
    return this.http.get(`${host}/email/${email}`,{headers: this.headers});
  }

  findAllByStatus(status:any):Observable<any>{
    return this.http.get(`${host}/status/${status}`,{headers: this.headers});
  }

  delete(id:any):Observable<any>{
    return this.http.delete(`${host}/delete/${id}`,{headers: this.headers});
  }
}
