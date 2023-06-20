import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';

const host = environment.STATISTIQUE;

@Injectable({
  providedIn: 'root'
})
export class StatistiquesService {
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

findNational(mois:any, annee:any):Observable<any>{
  return this.http.get(`${host}/national/mois/year/${mois}/${annee}`,{headers: this.headers});
}

findAllByProvinces(mois:any, annee:any):Observable<any>{
  return this.http.get(`${host}/provinces/mois/${mois}/year/${annee}`,{headers: this.headers});
}

findAllByOneProvince(mois:any, annee:any, province:any):Observable<any>{
  return this.http.get(`${host}/province/mois/${mois}/year/${annee}/province/${province}`,{headers: this.headers});
}

findAllByParcelle(mois:any, annee:any, id:any):Observable<any>{
  return this.http.get(`${host}/province/mois/${mois}/year/${annee}/id/${id}`,{headers: this.headers});
}


}
