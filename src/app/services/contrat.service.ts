import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { User } from '../models/user';


const host = environment.CONTRAT;

@Injectable({
  providedIn: 'root'
})
export class ContratService {

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

  save(form:any):Observable<any>{
    return this.http.post(`${host}`, form,{headers: this.headers});
  }

  update(form:any, id:any):Observable<any>{
    return this.http.put(`${host}/${id}`, form,{headers: this.headers});
  }

  findOne(id:any):Observable<any>{
    return this.http.get(`${host}/${id}`,{headers: this.headers});
  }

  produceFacture(id:any, date:any):Observable<any>{
    return this.http.get(`${host}/produceFacture/${id}/${date}`,{headers: this.headers});
  }

  findAllByOccupation(id:any):Observable<any>{
    return this.http.get(`${host}/occupation/${id}`,{headers: this.headers});
  }

  searchContract(value:any):Observable<any>{
    return this.http.get(`${host}/search/${value}`,{headers: this.headers});
  }

  findAllByOccupationAndStatus(id:any, status:any):Observable<any>{
    return this.http.get(`${host}/occupation/status/${id}/${status}`,{headers: this.headers});
  }

  findAllByStatus(status:any):Observable<any>{
    return this.http.get(`${host}/status/${status}`,{headers: this.headers});
  }

  findAllByTypeClient(typeClient:any):Observable<any>{
    return this.http.get(`${host}/typeClient/${typeClient}`,{headers: this.headers});
  }

  findAllBySecteurActivite(secteurActivite:any):Observable<any>{
    return this.http.get(`${host}/secteurActivite/${secteurActivite}`,{headers: this.headers});
  }

  delete(id:any):Observable<any>{
    return this.http.delete(`${host}/${id}`,{headers: this.headers});
  }

  cancel(id:any):Observable<any>{
    return this.http.get(`${host}/cancel/${id}`,{headers: this.headers});
  }
}
