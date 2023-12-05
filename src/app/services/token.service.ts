import { Injectable } from "@angular/core";
import {DatePipe} from "@angular/common";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from "@angular/router";

const TOKEN_KEY = 'AuthToken';

@Injectable({
  providedIn: 'root'
})
export class TokenService{


  years: string[]=[];
  newDate= new Date();
  timeout :any;

    constructor(private datePipe: DatePipe, private jwtHelper: JwtHelperService, private router:Router) { }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY) || '';
  }

  checkConnected(){
    if(this.jwtHelper.isTokenExpired(this.getToken())){
      sessionStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem('currentUser')
      if(confirm("Oooops, votre temps de connexion a expirer. Vueillez-vous reconnecter svp")){
        this.router.navigate(["/login"]);
      }
      
    }
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

  public getCurrentDate(): string{
    return this.datePipe.transform(this.newDate,"dd/MM/yyyy")!
  }

  public getCurrentYear(): string{
    return this.datePipe.transform(this.newDate,"yyyy")!
  }

  public getCurrentMois(): string{
    let month = this.datePipe.transform(this.newDate,"MM")!
    switch(month){
      case "01":
        return "JANVIER"
        break
      case "02":
        return "FEVRIER"
        break
      case "03":
        return "MARS"
        break
      case "04":
        return "AVRIL"
        break
      case "05":
        return "MAI"
        break
      case "06":
        return "JUIN"
        break
      case "07":
        return "JUILLET"
        break
      case "08":
        return "AOUT"
        break
      case "09":
        return "SEPTEMBRE"
        break
      case "10":
        return "OCTOBRE"
        break
      case "11":
        return "NOVEMBRE"
        break
      case "12":
        return "DECEMBRE"
        break
      default:
        return "Aucun mois trouver"
        break
    }
  }

  public getCurrentDateForExport(): string{
    return this.datePipe.transform(this.newDate,"yyyyMM")!
  }

  public setToken(token: string): void {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.setItem(TOKEN_KEY, token);
  }

  public setMois(mois: string): string {

    switch(mois){
      case "01":
        return "JANVIER";
        break;
      case "02":
        return "FEVRIER";
        break;
      case "03":
        return "MARS";
      case "04":
        return "AVRIL";
        break;
      case "05":
        return "MAI";
        break;
      case "06":
        return "JUIN";
        break;
      case "07":
        return "JUILLET";
        break;
      case "08":
        return "AOUT";
        break;
      case "09":
        return "SEPTEMBRE";
        break;
      case "10":
        return "OCTOBRE";
        break;
      case "11":
        return "NOVEMBRE";
        break;
      case "12":
        return "DECEMBRE";
        break;
    }
    return '';
  }
}
