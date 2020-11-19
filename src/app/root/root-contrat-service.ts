import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

const CONTRAT_API = 'http://localhost:8080/api/contrat';

@Injectable({
  providedIn: 'root'
})
export class RootContratService{

  constructor(private http: HttpClient){}

  getAll(): Observable<any> {
    return this.http.get(CONTRAT_API);
  }

  get(id): Observable<any> {
    return this.http.get(CONTRAT_API + '/' + id);
  }

  getAllByLocale(id): Observable<any> {
    return this.http.get(CONTRAT_API + '/locale/' + id);
  }

  getAllByClient(id): Observable<any> {
    return this.http.get(CONTRAT_API + '/client/' + id);
  }

  updateContrat(data, id): Observable<any> {
    return this.http.put(CONTRAT_API + '/' + id, data);
  }

  deleteContrat(id): Observable<any> {
    return this.http.delete(CONTRAT_API + '/' + id);
  }

}
