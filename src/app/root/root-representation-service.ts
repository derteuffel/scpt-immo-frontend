import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

const URL_API = 'http://localhost:8080/api/representation';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class RootRepresentationService{

  constructor(private http: HttpClient){}

  getAll(): Observable<any> {
    return this.http.get(URL_API);
  }

  get(id): Observable<any> {
    return this.http.get(URL_API + '/' + id);
  }

  create(data): Observable<any> {
    return this.http.post(URL_API,  {
      province: data.province,
      ville: data.ville,
      commune: data.commune,
      avenue: data.avenue,
      numParcelle: data.numParcelle
    });
  }

  update(id, data): Observable<any> {
    return this.http.post(URL_API + '/' + id, data);
  }

  delete(id): Observable<any> {
    return this.http.delete(URL_API + '/delete/' + id);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(URL_API);
  }

  findByTitle(title): Observable<any> {
    return this.http.get(URL_API + '/title/' + title);
  }
  findByProvince(province): Observable<any> {
    return this.http.get(URL_API + '/province/' + province);
  }
  findByCommune(commune): Observable<any> {
    return this.http.get(URL_API + '/commune/' + commune);
  }
  findByVille(ville): Observable<any> {
    return this.http.get(URL_API + '/ville/' + ville);
  }

}
