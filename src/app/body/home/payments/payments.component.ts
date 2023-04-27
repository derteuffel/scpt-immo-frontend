import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, MaxLengthValidator } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { max, Subscription } from 'rxjs';
import { Contrat } from 'src/app/models/contrat';
import { ContratService } from 'src/app/services/contrat.service';
import { LocaleService } from 'src/app/services/locale.service';
import { MensualiteService } from 'src/app/services/mensualite.service';
import Swal from 'sweetalert2';
import {months} from "../../../constant";
import {TokenService} from "../../../services/token.service";

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {
  lists: Contrat[]=[];
  anciens: Contrat[]=[];
  actifs: Contrat[]=[];
  selectedItem: any ={};
  mensualites: any[]=[];
  p:number=1;
  term: string='';
  date:any;
  searchForm:any ={};
  form: any ={};
  months: string[]=[];
  years: string[]=[];
  navigationParams: any ={};
  search: any ={};
  private subscriptions: Subscription[] = [];

  constructor(private route: Router, private localeService: LocaleService,
              private mensualiteService: MensualiteService, private tokenService: TokenService) { }

  ngOnInit(): void {
    this.months = months
    this.years = this.tokenService.getYearList();
  this.init();
  }


  init(){
        this.searchForm = new FormGroup({
      mois: new FormControl(""),
      year: new FormControl(""),
      value: new FormControl('')
    });

  }

  onSubmitSearch(){
    const searchValue = {mois:this.searchForm.get('mois').value,year: this.searchForm.get('year').value}
    const searchNavigationExtras: NavigationExtras = {
      queryParams:{
        'values':JSON.stringify(searchValue)
      }
    }
    this.route.navigate(['/admin/payments/search'], searchNavigationExtras);

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
