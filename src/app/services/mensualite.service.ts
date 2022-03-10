import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const host = environment.MENSUALITE;

@Injectable({
  providedIn: 'root'
})
export class MensualiteService {

  constructor(private http: HttpClient) { }

  findAll():Observable<any>{
    return this.http.get(`${host}`);
  }

  save(form:any,numero:any):Observable<any>{
    return this.http.post(`${host}/${numero}`, form);
  }

  update(form:any, id:any):Observable<any>{
    return this.http.put(`${host}/${id}`, form);
  }

  findOne(id:any):Observable<any>{
    return this.http.get(`${host}/${id}`);
  }

  findAllByContrat(id:any):Observable<any>{
    return this.http.get(`${host}/contrat/${id}`);
  }

  findAllByNumero(numero:any):Observable<any>{
    return this.http.get(`${host}/numero/${numero}`);
  }

  

  delete(id:any):Observable<any>{
    return this.http.delete(`${host}/${id}`);
  }
}
