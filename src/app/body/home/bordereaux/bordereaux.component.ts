import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { MensualiteService } from 'src/app/services/mensualite.service';
import Swal from 'sweetalert2';
import {months, provinceData} from "../../../constant";
import {TokenService} from "../../../services/token.service";
import {BordereausService} from "../../../services/bordereaus.service";
import {DatePipe} from "@angular/common";
import { Facture } from 'src/app/models/facture';
import { XlxsService } from 'src/app/services/xlxs/xlxs.service';
import { ContratService } from 'src/app/services/contrat.service';
import { Subscription, interval, takeWhile } from 'rxjs';

@Component({
  selector: 'app-bordereaux',
  templateUrl: './bordereaux.component.html',
  styleUrls: ['./bordereaux.component.css'],
  providers: [DatePipe]
})
export class BordereauxComponent implements OnInit,OnDestroy{

  lists: any;
  mois:any;
  montantPayer:any;
  montantImpayer:any;
  currentFacture: any;
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
  anneeEncours:any;
  moisEncours:any;
  checkSub?:Subscription;


  constructor(private bordereauxService: BordereausService,private datePipe:DatePipe,
              private contratService: ContratService, private tokenService: TokenService,
              private mensualiteService: MensualiteService, private xlxsService: XlxsService) { 
                  
              }
  ngOnDestroy(): void {
    this.checkSub?.unsubscribe();
  }

  ngOnInit(): void {
    this.checkSub = interval(300000).subscribe((func =>{
      this.tokenService.checkConnected();
    }))
  this.months = months;
  this.years = this.tokenService.getYearList();
  this.provinces = provinceData;
  this.getBordereaux();
    this.anneeEncours = this.tokenService.getCurrentYear();
    this.moisEncours = this.tokenService.getCurrentMois();
    this.init();

  }


  init(){
    this.searchForm = new FormGroup({
      mois: new FormControl(this.moisEncours),
      year: new FormControl(this.anneeEncours),
    });
    this.form = new FormGroup({
      clientName: new FormControl(''),
      idNumber: new FormControl(''),
      amount: new FormControl(0.0),
      contractNumber: new FormControl(''),
      month: new FormControl(this.moisEncours),
      years: new FormControl(this.anneeEncours),
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
    if(confirm('Voulez-vous generer le fichier excel?')){
      this.xlxsService.exportAsExcelFile(this.json, this.title);
    }
    
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
        contractNumber: this.currentFacture.numContrat,
        month: this.currentFacture.mois,
        years: this.currentFacture.annee,
        transactionNumber: "",
        status: true,
        paymentDate: this.datePipe.transform(new Date(),"dd-MM-yyyy")

    })
    this.clickButton('openPayment');
  }

  onGenerate(){
    let level = this.generateForm.get('niveau').value;
    if(level === "NATIONAL"){
      this.contratService.generateFactureNational().subscribe(
        data =>{
          Swal.fire('Merci...', 'Generation reussie!', 'success').then((res)=>{
            if(res.isConfirmed){
              this.getBordereaux();

              this.init();
              console.log(data);
            }});
            this.clickButton('closeGenerate');
        },
        error =>{
          Swal.fire('Ooops...', 'Une erreur est survenue lors de votre operation '+error, 'error');
          this.clickButton('closeGenerate');
        }
      );
    }else if(level === "PROVINCIAL"){
      this.contratService.generateFactureProvincial(this.generateForm.get('province').value).subscribe(
        data =>{
          Swal.fire('Merci...', 'Generation reussie!', 'success').then((res)=>{
            if(res.isConfirmed){
              this.getBordereaux();

              this.init();
              console.log(data);
            }});
            this.clickButton('closeGenerate');
        },
        error =>{
          Swal.fire('Ooops...', 'Une erreur est survenue lors de votre operation '+error, 'error');
          this.clickButton('closeGenerate');
        }
      );
    }else{
      console.log("Nothing to show")
      Swal.fire('Ooops...', 'Aucune option de generation choisis ', 'info');
          this.clickButton('closeGenerate');
    }
    
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
