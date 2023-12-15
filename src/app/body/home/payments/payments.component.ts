import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, MaxLengthValidator } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { interval, max, Subscription } from 'rxjs';
import { Contrat } from 'src/app/models/contrat';
import { ContratService } from 'src/app/services/contrat.service';
import { LocaleService } from 'src/app/services/locale.service';
import { MensualiteService } from 'src/app/services/mensualite.service';
import Swal from 'sweetalert2';
import {months, provinceData} from "../../../constant";
import {TokenService} from "../../../services/token.service";
import {DatePipe} from "@angular/common";
import {Chart, ChartConfiguration} from "chart.js";
import { XlxsService } from 'src/app/services/xlxs/xlxs.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css'],
  providers: [DatePipe]
})
export class PaymentsComponent implements OnInit {
  
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
  json:any;
  title ='';

  subscription?: Subscription;

  constructor(private route: Router, private xlxsService: XlxsService, private datePipe: DatePipe,
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
      mois: new FormControl(this.tokenService.getCurrentMois()),
      year: new FormControl(this.tokenService.getCurrentYear()),
      province: new FormControl("KINSHASA"),
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
    let month = this.setMois(this.searchForm.get('mois').value);
    let year = this.searchForm.get('year').value;
    this.mensualiteService.findAllForRepport(month,year).subscribe(
      data => {
            this.mensualites = data.mensualites;
            this.json = data.mensualites;
            this.title ="RESUME NATIONAL"+year+''+month
            this.initChart(data.montantPayer,data.montantImpayer,data.montantTotal,true)
          this.initChartNational(data.mensualiteSearchHelpers, true);
        console.log(data);
      }, error => {
        console.log(error);
      }
    );

  }

  exportToExcel(){
    if(confirm('Voulez-vous generer le fichier excel?')){
      this.xlxsService.exportAsExcelFile(this.json, this.title);
    }
    
  }

  getMensualites(){
    this.mensualiteService.findAll().subscribe(
      data =>{
        this.mensualites = data;
        this.json = data;
        this.title = "RESUME TOTAL";
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


  initChart(totalActive:any, totalInactive:any,total:any,status:any) {

    console.log('total active : '+totalActive);
    console.log('total inactive : '+totalInactive);
    console.log('total  : '+total);
    const chartConfig: ChartConfiguration = {
      type: 'bar',
      data: {
        labels: ['Montant National Payé', 'Montant National Impayé', 'Montant National Total'],
        datasets: [{
          label: 'Etat National en USD',
          data: [totalActive, totalInactive, total],
          backgroundColor: [
            'rgba(90, 239, 203,1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(255, 99, 132, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    };

    const st1Chart = document.getElementById('st1Chart');
    if (st1Chart instanceof HTMLCanvasElement) {

      if (status){
        var existChart = Chart.getChart("st1Chart");
        existChart?.destroy();
        existChart = new Chart(st1Chart, chartConfig);
      }else {
        var chart = new Chart(st1Chart, chartConfig);
      }
    }

  }
  initChartNational(lists:any,status:any) {

    let provinces = [];
    let impayees = [];
    let payees = [];
    let totals = [];
    for (let item of lists){
      provinces.push(item.province);
      impayees.push(item.impayer);
      payees.push(item.payer);
      totals.push(item.total);
    }
    const chartConfig: ChartConfiguration = {
      type: 'bar',
      data: {
        labels: provinces,
        datasets: [{
          label: 'Paiement complétés',
          data: payees,
          backgroundColor: [
            'rgba(90, 239, 203,1)',
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
          ],
          borderWidth: 1
        },{
          label: 'Paiement incomplet',
          data: impayees,
          backgroundColor: [
            'rgba(255, 99, 132, 1)',
          ],
          borderColor: [
            'rgba(255, 206, 86, 1)',
          ],
          borderWidth: 1
        },{
          label: 'Paiement total',
          data: totals,
          backgroundColor: [
            'rgba(54, 162, 235, 1)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: false
          }
        },
        plugins:{
          legend:{
            display: true
          }
        }
      }
    };

    const st2Chart = document.getElementById('st2Chart');
    if (st2Chart instanceof HTMLCanvasElement) {

      if (status){
        var existChart = Chart.getChart("st2Chart");
        existChart?.destroy();
        existChart = new Chart(st2Chart, chartConfig);
      }else {
        var chart = new Chart(st2Chart, chartConfig);
      }
    }

  }

   clickButton(buttonId: string): void {
    document.getElementById(buttonId)?.click();
  }

  setMois(item:string): string{
    let result = "";

    switch (item){
      case "01":
        result = "Janvier";
        break;
      case "02":
        result = "Fevrier";
        break;
      case "03":
        result = "Mars";
        break;
      case "04":
        result = "Avril";
        break;
      case "05":
        result = "Mai";
        break;
      case "06":
        result = "Juin";
        break;
      case "07":
        result = "Juillet";
        break;
      case "08":
        result = "Aout";
        break;
      case "09":
        result = "Septembre";
        break;
      case "10":
        result = "Octobre";
        break;
      case "11":
        result = "Novembre";
        break;
      case "12":
        result = "Decembre";
        break;
      default:
        result = item;
        break;
    }
    return result;
  }
}
