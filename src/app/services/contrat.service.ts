import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


const host = environment.CONTRAT;

@Injectable({
  providedIn: 'root'
})
export class ContratService {

  constructor(private http: HttpClient) { }

  findAll():Observable<any>{
    return this.http.get(`${host}`);
  }

  save(form:any,id:any):Observable<any>{
    return this.http.post(`${host}/${id}`, form);
  }

  update(form:any, id:any):Observable<any>{
    return this.http.put(`${host}/${id}`, form);
  }

  findOne(id:any):Observable<any>{
    return this.http.get(`${host}/${id}`);
  }

  findAllByLocale(id:any):Observable<any>{
    return this.http.get(`${host}/locale/${id}`);
  }

  findAllByLocaleAndStatus(id:any, status:any):Observable<any>{
    return this.http.get(`${host}/locale/status/${id}/${status}`);
  }

  findAllByStatus(status:any):Observable<any>{
    return this.http.get(`${host}/status/${status}`);
  }

  findAllByTypeClient(typeClient:any):Observable<any>{
    return this.http.get(`${host}/typeClient/${typeClient}`);
  }

  findAllBySecteurActivite(secteurActivite:any):Observable<any>{
    return this.http.get(`${host}/secteurActivite/${secteurActivite}`);
  }

  delete(id:any):Observable<any>{
    return this.http.delete(`${host}/${id}`);
  }

  cancel(id:any):Observable<any>{
    return this.http.get(`${host}/cancel/${id}`);
  }
}
