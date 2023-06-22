import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { MensualiteService } from 'src/app/services/mensualite.service';
import Swal from 'sweetalert2';
import {months} from "../../../constant";
import {TokenService} from "../../../services/token.service";
import {BordereausService} from "../../../services/bordereaus.service";
import {DatePipe} from "@angular/common";
import { Facture } from 'src/app/models/facture';
import { XlxsService } from 'src/app/services/xlxs/xlxs.service';

@Component({
  selector: 'app-bordereaux',
  templateUrl: './bordereaux.component.html',
  styleUrls: ['./bordereaux.component.css'],
  providers: [DatePipe]
})
export class BordereauxComponent implements OnInit {

  lists: any;
  mois:any;
  montantPayer:any;
  montantImpayer:any;
  currentFacture!: Facture;
  message:any;
  successMessage:any;
  searchForm: any ={};
  isRepportProduce: boolean = false;
  navigationParams: any={};
  form: any ={};
  generateForm: any={};
  months: string[]=[];
  years: string[]=[];
  selectedItem: any ={};
  p:number=1;
  term: string='';
  provinces: Array<any> =[];
  json:any;
  title ='';


  constructor(private bordereauxService: BordereausService,private datePipe:DatePipe,
              private activatedRoute: ActivatedRoute, private tokenService: TokenService,
              private mensualiteService: MensualiteService, private xlxsService: XlxsService) { }

  ngOnInit(): void {
  this.months = months;
  this.years = this.tokenService.getYearList();
  this.getBordereaux();
    this.init();

  }


  init(){
    this.searchForm = new FormGroup({
      mois: new FormControl(""),
      year: new FormControl(""),
    });
    this.form = new FormGroup({
      clientName: new FormControl(''),
      idNumber: new FormControl(''),
      amount: new FormControl(0.0),
      contractNumber: new FormControl(''),
      month: new FormControl(''),
      years: new FormControl(''),
      transactionNumber: new FormControl(''),
      status: new FormControl(false),
      paymentDate: new FormControl(null),
      agentCode: new FormControl(''),
      numFacture: new FormControl('')

    })

    this.generateForm = new FormGroup({
      niveau: new FormControl(''),
      province: new FormControl('')
    })

  }


  exportToExcel(){
    this.xlxsService.exportAsExcelFile(this.json, this.title);
  }

  onSubmitSearch(){
    const searchValue = {mois:this.searchForm.get('mois').value,year:this.searchForm.get('year').value}
    if (searchValue.mois != null && searchValue.mois != ""){
      this.bordereauxService.findAllByStatusAndMoisAndYear(false,searchValue.mois,searchValue.year).subscribe(
        data =>{
          this.lists = data;
          this.json = data;
          this.title = 'RAPPORT '+searchValue.mois+''+searchValue.year;
          console.log(data);
        },
        error => {
          console.log(error);
        }
      );
    }else {
      this.bordereauxService.findAllByStatusAndAnnee(false, searchValue.year).subscribe(
        data =>{
          this.lists = data;
          this.json = data;
          this.title = 'RAPPORT '+searchValue.year;
          console.log(data);
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  getBordereaux(){

    this.bordereauxService.findAllByStatusAndAnnee(false,this.tokenService.getCurrentYear()).subscribe(
      data =>{
        this.lists = data;
        this.json = data;
        this.title = 'RAPPORT '+this.tokenService.getCurrentYear();
        console.log(data);
      },
      error =>{
        console.log(error);
      }
    );
  }

  getBordereauxTrue(){

    this.bordereauxService.findAllByStatusAndAnnee(true,this.tokenService.getCurrentYear()).subscribe(
      data =>{
        this.lists.push(data);
        console.log(data);
      },
      error =>{
        console.log(error);
      }
    );
  }

  
  payment(item:any){

    this.currentFacture = item;
    console.log(this.currentFacture.mois);
    console.log(this.currentFacture.annee);
    this.form.patchValue({
        numFacture: this.currentFacture.numFacture,
        agentCode: "",
        idNumber: "",
        clientName:"",
        amount: this.currentFacture.montant,
        contractNumber: this.currentFacture.contrat.numContrat,
        month: this.currentFacture.mois,
        years: this.currentFacture.annee,
        transactionNumber: "",
        status: true,
        paymentDate: this.datePipe.transform(new Date(),"dd-MM-yyyy")

    })
    this.clickButton('openPayment');
  }

  onGenerate(){
    let level = this.generateForm.get('niveau')
    this.clickButton('closeGenerate');
  }

  onMakePayment(){
    console.log(this.form.value);
    this.mensualiteService.makePayment(this.form.value).subscribe(
      data => {
        console.log(data);
        this.clickButton("closePayment")
        Swal.fire('Merci...', 'Le paiement a été éffectué avec succes', 'success').then((res)=>{
          if(res.isConfirmed){
            this.getBordereaux();
          }});
      },
      error =>{
        console.log(error);
        Swal.fire('Ooops...', 'Une erreur est survenue lors de votre operation '+error, 'error');
      }
    );
  }

  clickButton(buttonId: string): void {
    document.getElementById(buttonId)?.click();
  }

}
