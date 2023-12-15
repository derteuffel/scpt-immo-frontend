import { Component, OnDestroy, OnInit } from '@angular/core';
import {UntypedFormGroup, UntypedFormControl, FormGroup, FormControl} from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { MensualiteService } from 'src/app/services/mensualite.service';
import Swal from 'sweetalert2';
import {months, provinceData} from "../../../constant";
import {TokenService} from "../../../services/token.service";
import {Chart, ChartConfiguration} from "chart.js";
import { XlxsService } from 'src/app/services/xlxs/xlxs.service';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-payments-search',
  templateUrl: './payments-search.component.html',
  styleUrls: ['./payments-search.component.css']
})
export class PaymentsSearchComponent implements OnInit {

  mensualites: any[]=[];
  montantTotal:any;
  montantPayer:any;
  montantImpayer:any;
  message:any;
  successMessage:any;
  searchForm: any ={};
  isRepportProduce: boolean = false;
  navigationParams: any={};
  form: any ={};
  months: string[]=[];
  years: string[]=[];
  provinces: Array<any>=[];
  selectedItem: any ={};
  p:number=1;
  term: string='';
  json:any;
  title="";

  checkSub?:Subscription;


  constructor(private mensualiteService: MensualiteService, private route: Router,
              private activatedRoute: ActivatedRoute, private tokenService: TokenService,
              private xlxsService:XlxsService) { }
  
  

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
        console.log(params['values']);
        if(params['values']){
        this.navigationParams = JSON.parse(params['values']);
        }
        
        this.loadByDate(this.navigationParams );
      });
    this.months = months;
    this.years = this.tokenService.getYearList();
    this.provinces = provinceData

    this.init();

  }


  init(){
    this.searchForm = new FormGroup({
      mois: new FormControl(""),
      year: new FormControl(""),
      value: new FormControl(''),
      province: new FormControl('')
    });

  }


  onSubmitSearch(){
    const searchValue = {mois:this.searchForm.get('mois').value,year:this.searchForm.get('year').value,province:this.searchForm.get('province').value}
    const searchNavigationExtras: NavigationExtras = {
      queryParams:{
        'values':JSON.stringify(searchValue)
      }
    }
    this.route.navigate(['/admin/payments/search'], searchNavigationExtras);

  }

  loadByDate(form:any){
    console.log(form);

    this.mensualiteService.findAllByDate(form.mois, form.year, form.province).subscribe(
      data =>{
        this.mensualites = data.mensualites;
        this.json = data.mensualites;
        this.montantImpayer = data.montantImpayer;
        this.montantPayer = data.montantPayer;
        this.montantTotal = data.montantTotal;
        console.log(data);
        if(this.mensualites.length < 1){
         this.message = 'Aucun resultat trouve pour votre recherche';
        }
        this.initChart(this.montantPayer,this.montantImpayer,this.montantTotal,form.province,true);
      },
      error =>{
        console.log(error);
      }
    );
  }


  exportToExcel(){
    if(confirm('Voulez-vous generer le fichier excel?')){
      this.xlxsService.exportAsExcelFile(this.json, this.title);
    }
    
  }

  generateRepport(){
    const formData = this.navigationParams;
    console.log(formData);
    this.mensualiteService.generateRepport(formData.date).subscribe(
      data =>{
        this.isRepportProduce = true;
        console.log('Je viens d\'entrer ');
        console.log('Je suis sortie');
        console.log(this.isRepportProduce);
        this.successMessage = 'Operation reussie';
        Swal.fire('Thank you....', 'You have generated your repport successfuly', 'success')



      },
      error =>{
        console.log(error);
        Swal.fire('Ooops....', 'Internal error occured while generating repport', 'error')
      }
    );
  }

  downloadRepport(){
    this.mensualiteService.printRepport().subscribe(
      data =>{
        console.log('Download successfuly');
      },
      error =>{
        console.log('Download Failed');
        console.log(error);
      }
    );
  }



  initChart(totalActive:any, totalInactive:any,total:any,province:any,status:any) {

    console.log('total active : '+totalActive);
    console.log('total inactive : '+totalInactive);
    console.log('total  : '+total);
    const chartConfig: ChartConfiguration = {
      type: 'bar',
      data: {
        labels: ['Montant Payé de '+province, 'Montant Impayé de '+province, 'Montant Total de '+province],
        datasets: [{
          label: 'Etat en USD de '+province,
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
   clickButton(buttonId: string): void {
    document.getElementById(buttonId)?.click();
  }

}
