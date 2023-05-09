import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, MaxLengthValidator } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { max, Subscription } from 'rxjs';
import { Contrat } from 'src/app/models/contrat';
import { ContratService } from 'src/app/services/contrat.service';
import { LocaleService } from 'src/app/services/locale.service';
import { MensualiteService } from 'src/app/services/mensualite.service';
import Swal from 'sweetalert2';
import {months, provinceData} from "../../../constant";
import {TokenService} from "../../../services/token.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css'],
  providers: [DatePipe]
})
export class PaymentsComponent implements OnInit {
  anciens: Contrat[]=[];
  actifs: Contrat[]=[];
  montantTotal:any;
  montantPayer:any;
  montantImpayer:any;
  selectedItem: any ={};
  mensualites: any[]=[];
  p:number=1;
  term: string='';
  date:any;
  searchForm:any ={};
  form: any ={};
  months: string[]=[];
  provinces: Array<any> =[];
  years: string[]=[];
  navigationParams: any ={};
  search: any ={};
  private subscriptions: Subscription[] = [];

  constructor(private route: Router, private localeService: LocaleService, private datePipe: DatePipe,
              private mensualiteService: MensualiteService, private tokenService: TokenService) { }

  ngOnInit(): void {
    this.months = months
    this.years = this.tokenService.getYearList();
    this.provinces = provinceData;
  this.init();
  this.onSubmitSearch();
  }


  init(){
        this.searchForm = new FormGroup({
      mois: new FormControl(""),
      year: new FormControl(""),
      province: new FormControl(""),
      value: new FormControl('')
    });

  }

  onSubmitSearchByProvince(){
    const searchValue = {mois:this.searchForm.get('mois').value,year: this.searchForm.get('year').value,province: this.searchForm.get('province').value}
    const searchNavigationExtras: NavigationExtras = {
      queryParams:{
        'values':JSON.stringify(searchValue)
      }
    }
    this.route.navigate(['/admin/payments/search'], searchNavigationExtras);

  }
  onSubmitSearch(){
    let month =this.searchForm.get('mois').value;
    let year = this.searchForm.get('province').value;
    if ( month == '' && year == ''){
      month = this.datePipe.transform(new Date(),"MM")
      year = this.datePipe.transform(new Date(),"yyyy")
    }

    this.mensualiteService.findAllForRepport(month,year,[]).subscribe(
      data => {
            this.mensualites = data.lists;
            console.log(data);
      }, error => {
        console.log(error);
      }
    );

  }

  getMensualites(){
    this.mensualiteService.findAll().subscribe(
      data =>{
        this.mensualites = data;
        console.log(data);
      },
      error =>{
        console.log(error);
      }
    );
  }




  paymentForm(item:any){
    this.selectedItem = item;
    this.clickButton('openMensualiteForm');
  }

   clickButton(buttonId: string): void {
    document.getElementById(buttonId)?.click();
  }
}
