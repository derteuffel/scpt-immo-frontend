import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

const host = environment.AUTH;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const userJson = localStorage.getItem('currentUser');

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentUser: Observable<User>;
  public currentUserSubject: BehaviorSubject<User>;

  private authUrl =  host ;
  //private testUrl = 'http://localhost:8181/api/account';

  username?: string;

  currentUserO: User;
  headers: HttpHeaders;

  constructor(private http: HttpClient ) {
                this.currentUserSubject = new BehaviorSubject<User> (JSON.parse(localStorage.getItem('currentUser')|| '{}'));
                this.currentUser = this.currentUserSubject.asObservable();
                this.currentUserO = JSON.parse(localStorage.getItem('currentUser') || '{}');
                this.headers = (this.currentUserO==null || this.currentUserO == undefined) ? new HttpHeaders({
                  'Content-Type': 'application/json; charset=UTF-8'
                }):new HttpHeaders({
                  authorization: 'Bearer ' + this.currentUserO.token,
                  'Content-Type': 'application/json; charset=UTF-8'
                });
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  logOut() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('reload');
        this.currentUserSubject.next(null as any);
    console.log('je suis ici dedans')
    /* return this.http.post(this.authUrl + "/logout", {}).pipe(
      map(response => {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
      })
    ); */
  }

  

  
  reloadPage() {
    window.location.replace('/login');
  }

  /* login(credentials): Observable<any> {
    return this.http.post(this.loginUrl, {
      username: credentials.username,
      password: credentials.password
    }, httpOptions);

    {"id":23,"profile":null,"deleted":null,"email":"takedealbert@gmail.com","enabled":true,"username":"takedealbert@gmail.com","created_date":1624395802000,"password":null,"phone":"237695345931","full_name":"TAKEDE MADIGA Albert","birth_date":null,"province":null,"commune":null,"secteur_activite":"Agriculture","id_number":null,"interest":"","provide_by":null,"token":"eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0YWtlZGVhbGJlcnRAZ21haWwuY29tIiwicm9sZXMiOiJDTElFTlQiLCJleHAiOjE2MjY5NTMxNjd9.a4Q-giY2Jh4eLaaIxfFQVzZxZ-qBbCWiSvKAn-0bM641QieJZkKNGoK-Ts1zSLHLFD99iF4TmklSp5QLoXPH7Q","activation_code":"Fc4lcIisck","created_on":null,"created_at":null,"updated_on":null,"updated_at":null,"isDeleted":null,"role":"CLIENT","utilisateur_id":null}#_=_

  } */

  login(user:any): Observable<any> {
    const headers = new HttpHeaders(user ? {
      authorization:'Basic ' + btoa(user.username + ':' + user.password)
    }:{});

    return this.http.get<any> (this.authUrl + "/signin", {headers:headers}).pipe(
      map(response => {
        if(response) {
          localStorage.setItem('currentUser', JSON.stringify(response));
          this.currentUserSubject.next(response);
        }
        return response;
      })
    );
  }

  signUp(user:any): Observable<any> {
    return this.http.post(this.authUrl + '/signup', JSON.stringify(user), {headers: {'Content-Type': 'application/json; charset= UTF-8'}})
    .pipe(
      catchError(this.errorHandler)
    );
  }

  getUserToken():string{
    let userCurrent:any;
    if(userJson!=null){
      userCurrent = JSON.parse(localStorage.getItem('currentUser')|| '{}');
      return userCurrent.token;
    }
    return null as any;
  }

  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }

 findAll(): Observable<any>{
   return this.http.get(`${host}/all`, {headers: this.headers});
 }

 findAllByProvince(province:any): Observable<any>{
  return this.http.get(`${host}/province/${province}`, {headers: this.headers});
}

 save(form:any): Observable<any>{
   return this.http.post(`${host}/signup`, form, {headers: this.headers});
 }

 update(id:any, form:any): Observable<any>{
   return this.http.put(`${host}/update/${id}`, form,{headers: this.headers});
 }

 findOne(id:any): Observable<any>{
   return this.http.get(`${host}/get/${id}`, {headers:this.headers});
 }

 updateRole(id:any,role:any): Observable<any>{
  return this.http.get(`${host}/update/role/${id}/${role}`, {headers:this.headers});
}

 delete(id:any): Observable<any>{
   return this.http.delete(`${host}/delete/${id}`, {headers: this.headers});
 }

}
