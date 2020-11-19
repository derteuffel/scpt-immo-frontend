import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

const CLIENT_API = 'http://localhost:8080/api/client';

@Injectable({
  providedIn: 'root'
})
export class RootClientService{

  constructor(private http: HttpClient){

  }

  createClient(data, id): Observable<any>{
    return this.http.post(CLIENT_API + '/' + id, data);
  }

  getAll(): Observable<any>{
    return  this.http.get(CLIENT_API);
  }


}
