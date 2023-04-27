import { Injectable } from '@angular/core';
import {User} from "../../models/user";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../../auth/auth.service";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

const host = environment.ETAPE;
@Injectable({
  providedIn: 'root'
})
export class EtapeService {
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
    return this.http.post(`${host}/save`, form,{headers: this.formHeaders});
  }

  update(form:any):Observable<any>{
    return this.http.put(`${host}/update`, form,{headers: this.formHeaders});
  }

  findOne(id:any):Observable<any>{
    return this.http.get(`${host}/findOne/${id}`,{headers: this.headers});
  }

  findAllByDossier(value:any):Observable<any>{
    return this.http.get(`${host}/dossier/${value}`,{headers: this.headers});
  }

  findAllByActionAndDossier(action:any, id:any):Observable<any>{
    return this.http.get(`${host}/action/${action}/dossier/${id}`,{headers: this.headers});
  }

  findAllByServiceAndDossier(service:any, id:any):Observable<any>{
    return this.http.get(`${host}/sevice/${service}/dossier/${id}`,{headers: this.headers});
  }

  findAllByStatusAndDossier(status:any,id:any):Observable<any>{
    return this.http.get(`${host}/status/${status}/dossier/${id}`,{headers: this.headers});
  }

  delete(id:any):Observable<any>{
    return this.http.delete(`${host}/delete/${id}`,{headers: this.headers});
  }
}
