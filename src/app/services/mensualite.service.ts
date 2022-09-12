import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

const host = environment.MENSUALITE;

@Injectable({
  providedIn: 'root'
})
export class MensualiteService {

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

  save(form:any,numero:any):Observable<any>{
    return this.http.post(`${host}/${numero}`, form,{headers: this.headers});
  }

  update(form:any, id:any):Observable<any>{
    return this.http.put(`${host}/${id}`, form,{headers: this.formHeaders});
  }

  uploadQuitance(form:any, id:any):Observable<any>{
    return this.http.post(`${host}/upload/${id}`, form,{headers: this.formHeaders});
  }

  findOne(id:any):Observable<any>{
    return this.http.get(`${host}/${id}`,{headers: this.headers});
  }

  findAllByContrat(id:any):Observable<any>{
    return this.http.get(`${host}/contrat/${id}`,{headers: this.headers});
  }

  findAllByStatusAndContrat(id:any, status:any):Observable<any>{
    return this.http.get(`${host}/contrat/status/${id}/${status}`,{headers: this.headers});
  }

  findAllByNumero(numero:any):Observable<any>{
    return this.http.get(`${host}/numero/${numero}`,{headers: this.headers});
  }

  findAllByDate(date:any):Observable<any>{
    return this.http.get(`${host}/date/${date}`,{headers: this.headers});
  }


  generateRepport(date:any):Observable<any>{
    return this.http.get(`${host}/generateRepport/${date}`,{headers: this.headers});
  }

  printRepport():Observable<any>{
    return this.http.get(`${host}/printRepport`,{headers: this.headers});
  }



  

  delete(id:any):Observable<any>{
    return this.http.delete(`${host}/${id}`,{headers: this.headers});
  }
}