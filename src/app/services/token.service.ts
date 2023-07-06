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
        return "Janvier"
        break
      case "02":
        return "Fevrier"
        break
      case "03":
        return "Mars"
        break
      case "04":
        return "Avril"
        break
      case "05":
        return "Mai"
        break
      case "06":
        return "Juin"
        break
      case "07":
        return "Juillet"
        break
      case "08":
        return "Aout"
        break
      case "09":
        return "Septembre"
        break
      case "10":
        return "Octobre"
        break
      case "11":
        return "Novembre"
        break
      case "12":
        return "Decembre"
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
        return "Janvier";
        break;
      case "02":
        return "Fevrier";
        break;
      case "03":
        return "Mars";
      case "04":
        return "Avril";
        break;
      case "05":
        return "Mai";
        break;
      case "06":
        return "Juin";
        break;
      case "07":
        return "Juillet";
        break;
      case "08":
        return "Aout";
        break;
      case "09":
        return "Septembre";
        break;
      case "10":
        return "Octobre";
        break;
      case "11":
        return "Novembre";
        break;
      case "12":
        return "Decembre";
        break;
    }
    return '';
  }
}
