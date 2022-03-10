import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const host = environment.AUTH;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient) { }

  login(loginForm:any):Observable<any>{
    return this.http.post(`${host}/signin`, loginForm, httpOptions);
  }

  register(registerForm: any):Observable<any>{
    return this.http.post(`${host}/signup`, registerForm, httpOptions);
  }

  findAll():Observable<any>{
    return this.http.get(`${host}/all`,httpOptions);
  }

  findOne(id:any):Observable<any>{
    return this.http.get(`${host}/get/${id}`, httpOptions);
  }

  findByRepresentation(id:any):Observable<any>{
    return this.http.get(`${host}/representation/${id}`,httpOptions);
  }

  update(form: any, id: any):Observable<any>{
    return this.http.put(`${host}/update/${id}`, form, httpOptions);
  }

  delete(id:any):Observable<any>{
    return  this.http.delete(`${host}/delete/${id}`,httpOptions);
  }

}
