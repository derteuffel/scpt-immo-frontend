import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

const baseUrl = 'http://localhost:8080/api/representation';

@Injectable({
  providedIn: 'root'
})
export class RootRepresentationService{

  constructor(private http: HttpClient){}

  getAll(): Observable<any> {
    return this.http.get(baseUrl);
  }

  get(id): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id, data): Observable<any> {
    return this.http.post(`${baseUrl}/${id}`, data);
  }

  delete(id): Observable<any> {
    return this.http.delete(`${baseUrl}/delete/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByTitle(title): Observable<any> {
    return this.http.get(`${baseUrl}?title=${title}`);
  }
  findByProvince(province): Observable<any> {
    return this.http.get(`${baseUrl}/province/${province}`);
  }
  findByCommune(commune): Observable<any> {
    return this.http.get(`${baseUrl}/commune/${commune}`);
  }
  findByVille(ville): Observable<any> {
    return this.http.get(`${baseUrl}/ville/${ville}`);
  }

}
