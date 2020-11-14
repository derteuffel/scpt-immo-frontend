import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Locale} from '../model/locale';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocaleService {

  private AUTH_API = 'http://localhost:8080/api/locale';
  constructor(private http: HttpClient) { }

  createLocale(local: Locale, id: number): Observable<any>{

    return this.http.post(`${this.AUTH_API}/save/${id}`, local);
  }

  getLocalId(id: number): Observable<any>{
    return this.http.get(`${this.AUTH_API}/${id}`);
  }

  getLocalByRepresentation(id: number): Observable<any>{

    return this.http.get(`${this.AUTH_API}/representation/${id}`);
  }

  deleteLocal(id: number): Observable<any>{
    return this.http.delete(`${this.AUTH_API}/delete/${id}`);
  }

}
