import { Injectable } from "@angular/core";
import {DatePipe} from "@angular/common";

const TOKEN_KEY = 'AuthToken';

@Injectable({
  providedIn: 'root'
})
export class TokenService{


  years: string[]=[];
  newDate= new Date();

    constructor(private datePipe: DatePipe) { }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY) || '';
  }

  public getYearList(): string[] {

    var previousYears = Number(this.datePipe.transform(this.newDate,'yyyy'));
    for(let i=10; i>=0; i--){
      this.years.push(previousYears-i+"")
    }
    for(let i=0; i<=10; i++){
      this.years.push(previousYears+i+"")
    }
    console.log(this.years);
      return this.years
  }

  public setToken(token: string): void {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.setItem(TOKEN_KEY, token);
  }
}
