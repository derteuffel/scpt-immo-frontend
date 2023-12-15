import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription, interval } from 'rxjs';
import { months, provinceData } from 'src/app/constant';
import { StatistiquesService } from 'src/app/services/statistques/statistiques.service';
import { TokenService } from 'src/app/services/token.service';
import { XlxsService } from 'src/app/services/xlxs/xlxs.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-statistiques',
  templateUrl: './statistiques.component.html',
  styleUrls: ['./statistiques.component.css'],
  providers: [DatePipe]
})
export class StatistiquesComponent implements OnInit {

  lists:any[]=[];
  provinces:Array<any> = [];
  json:any;
  title = '';
  mois:any;
  years:any;
  form:any;
  provinceForm:any;
  p:number=1;
  checkSub?:Subscription;

  constructor(private statistiqueService:StatistiquesService, private tokenService:TokenService,
    private xsxlService:XlxsService, private datePipe: DatePipe) { }
  

  ngOnInit(): void {
    this.provinces = provinceData;
    this.mois = months;
    this.years = this.tokenService.getYearList();
    this.init();
  }

  retrievesNational(){
    let choice = this.form.get('province').value;
    if(choice === "NATIONALE"){
    this.statistiqueService.findNational(this.form.get('month').value,this.form.get('year').value).subscribe(
      data =>{
        this.lists.push(data);
        this.json = data;
        this.title = 'RESUME NATIONALE'
        console.log(data);
      
      },
      error =>{
        console.log(error);
        Swal.fire('Ooops...', ' Une erreur est survenue lors de votre operation'+error.message, 'error');
      }
    );
    }else if(choice === "NATIONALE AVEC DETAIL PAR PROVINCE"){
      this.statistiqueService.findAllByProvinces(this.form.get('month').value,this.form.get('year').value).subscribe(
        data =>{
          this.lists = data;
          this.json = data;
          this.title ='RESUME PAR PROVINCE'
          console.log(data);
        },
        error =>{
          console.log(error);
          Swal.fire('Ooops...', 'Une erreur est survenue lors de votre operation '+error.message, 'error');
        }
      );
    }

  }

  retrievesProvince(){
    this.statistiqueService.findAllByOneProvince(this.provinceForm.get('month').value,this.provinceForm.get('year').value,this.provinceForm.get('province').value).subscribe(
      data =>{
        this.lists = data;
        this.json = data;
        this.title ='RESUME '+this.provinceForm.get('province').value;
        console.log(data);
        console.log(this.json);
      },
      error =>{
        console.log(error);
        Swal.fire('Ooops...', 'Une erreur est survenue lors de votre operation '+error, 'error');
      }
    );
    

  }

  exportToExcel(){
    this.xsxlService.exportAsExcelFile(this.json, this.title);
  }

  init(){
    this.form = new FormGroup({
      month: new FormControl(this.tokenService.setMois(this.tokenService.getCurrentMois())),
      year: new FormControl(this.tokenService.getCurrentYear()),
      province: new FormControl('')
    })
    this.provinceForm = new FormGroup({
      month: new FormControl(this.tokenService.getCurrentMois()),
      year: new FormControl(this.tokenService.getCurrentYear()),
      province: new FormControl('')
    })
  }



}
