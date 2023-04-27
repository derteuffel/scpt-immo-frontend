import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {User} from "../models/user";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../auth/auth.service";
import {Observable} from "rxjs";

const host = environment.BORDEREAUX;
@Injectable({
  providedIn: 'root'
})
export class BordereausService {

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

  save(form:any, id:any):Observable<any>{
    return this.http.post(`${host}/save/${id}`, form,{headers: this.headers});
  }



  update(form:any, id:any):Observable<any>{
    return this.http.put(`${host}/update/${id}`, form,{headers: this.headers});
  }

  findOne(id:any):Observable<any>{
    return this.http.get(`${host}/getOne/${id}`,{headers: this.headers});
  }

  findAllByStatusAndMoisAndYear(status:any, mois:any, year:any):Observable<any>{
    return this.http.get(`${host}/status/${status}/mois/${mois}/annee/${year}`,{headers: this.headers});
  }

  findAllByContratAndAnnee(id:any, annee:any):Observable<any>{
    return this.http.get(`${host}/contrat/annee/${id}/${annee}`,{headers: this.headers});
  }
  findAllByContrat(id:any):Observable<any>{
    return this.http.get(`${host}/contrat/${id}`,{headers: this.headers});
  }
  findAllByContratAndStatus(id:any, status:any):Observable<any>{
    return this.http.get(`${host}/contrat/status/${id}/${status}`,{headers: this.headers});
  }

  findAllByStatusAndAnnee(status:any, annee:any):Observable<any>{
    return this.http.get(`${host}/status/${status}/annee/${annee}`,{headers: this.headers});
  }

  delete(id:any):Observable<any>{
    return this.http.delete(`${host}/delete/${id}`,{headers: this.headers});
  }
}
