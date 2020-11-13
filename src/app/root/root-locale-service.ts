import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

const LOCALE_API = 'http://localhost:8080/api/locale';

@Injectable({
  providedIn: 'root'
})
export class RootLocaleService{


  constructor(private http: HttpClient){}

  getAll(): Observable<any> {
    return this.http.get(LOCALE_API);
  }

  get(id): Observable<any> {
    return this.http.get(LOCALE_API + id);
  }

  getAllByRepresentation(id): Observable<any> {
    return this.http.get(LOCALE_API + '/representation/' + id);
  }

}
