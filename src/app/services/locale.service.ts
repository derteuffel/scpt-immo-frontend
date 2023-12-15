import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { User } from '../models/user';

const host = environment.LOCALE;

@Injectable({
  providedIn: 'root'
})
export class LocaleService {

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
    return this.http.get(`${host}`,{headers: this.headers});
  }

  save(form:any):Observable<any>{
    return this.http.post(`${host}/save`, form,{headers: this.headers});
  }

  upload(form:any):Observable<any>{
    return this.http.post(`${host}/localData`, form,{headers: this.headers});
  }

  update(form:any, id:any):Observable<any>{
    return this.http.put(`${host}/${id}`, form,{headers: this.headers});
  }

  uploadFiles(form:any, id:any):Observable<any>{
    console.log(form.name);
    let formData = new FormData();
    formData.append("file",form)
    return this.http.post(`${host}/uploadFile/${id}`, formData,{headers: this.formHeaders});
  }

  uploadDocuments(form:any, id:any):Observable<any>{
    console.log(form.name);
    let formData = new FormData();
    formData.append("file",form)
    return this.http.post(`${host}/uploadDocument/${id}`, formData,{headers: this.formHeaders});
  }

  removeFile(form:any, id:any):Observable<any>{
    return this.http.get(`${host}/removeFile/${id}?file=${form}`,{headers: this.headers});
  }

  removeDocument(form:any, id:any):Observable<any>{
    return this.http.get(`${host}/removeDocument/${id}?file=${form}`,{headers: this.headers});
  }

  findOne(id:any):Observable<any>{
    return this.http.get(`${host}/${id}`,{headers: this.headers});
  }

  findAllByProvince(value:any):Observable<any>{
    return this.http.get(`${host}/province/${value}`,{headers: this.headers});
  }

  findAllByVille(value:any):Observable<any>{
    return this.http.get(`${host}/ville/${value}`,{headers: this.headers});
  }

  findAllByNumero(numero:any):Observable<any>{
    return this.http.get(`${host}/numLocale/${numero}`,{headers: this.headers});
  }

  findAllByRepresentationAndStatus(id:any, status:any):Observable<any>{
    return this.http.get(`${host}/representation/status/${id}/${status}`,{headers: this.headers});
  }

  findAllByStatus(status:any):Observable<any>{
    return this.http.get(`${host}/status/${status}`,{headers: this.headers});
  }

  delete(id:any):Observable<any>{
    return this.http.delete(`${host}/delete/${id}`,{headers: this.headers});
  }
}
