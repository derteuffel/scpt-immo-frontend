import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const host = environment.LOCALE;

@Injectable({
  providedIn: 'root'
})
export class LocaleService {

  constructor(private http: HttpClient) { }

  findAll():Observable<any>{
    return this.http.get(`${host}`);
  }

  save(form:any):Observable<any>{
    return this.http.post(`${host}/save`, form);
  }

  upload(form:any):Observable<any>{
    return this.http.post(`${host}/localData`, form);
  }

  update(form:any, id:any):Observable<any>{
    return this.http.put(`${host}/${id}`, form);
  }

  findOne(id:any):Observable<any>{
    return this.http.get(`${host}/${id}`);
  }

  findAllByRepresentation(id:any):Observable<any>{
    return this.http.get(`${host}/representation/${id}`);
  }

  findAllByNumero(numero:any):Observable<any>{
    return this.http.get(`${host}/numLocale/${numero}`);
  }

  findAllByRepresentationAndStatus(id:any, status:any):Observable<any>{
    return this.http.get(`${host}/representation/status/${id}/${status}`);
  }

  findAllByStatus(status:any):Observable<any>{
    return this.http.get(`${host}/status/${status}`);
  }

  delete(id:any):Observable<any>{
    return this.http.delete(`${host}/delete/${id}`);
  }
}
