import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, MaxLengthValidator } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { max, Subscription } from 'rxjs';
import { Contrat } from 'src/app/models/contrat';
import { ContratService } from 'src/app/services/contrat.service';
import { LocaleService } from 'src/app/services/locale.service';
import { MensualiteService } from 'src/app/services/mensualite.service';

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
  isContrat: Boolean=false;
  isMensualite: Boolean = false;
  mensualites: any[]=[];
  p:number=1;
  term: string='';
  date:any;
  searchForm:any ={};
  form: any ={};
  months: string[]=[];
  navigationParams: any ={};
  search: any ={};
  private subscriptions: Subscription[] = [];

  constructor(private contratService:ContratService, private route: Router,
    private localeService: LocaleService, private mensualiteService: MensualiteService) { }

  ngOnInit(): void {
  this.getContratActifs();
  this.init();
  }

  
  init(){
    this.form = new FormGroup({
      numeroBodereau: new FormControl(''),
      date: new FormControl(null),
      montant: new FormControl('')
    });

    this.searchForm = new FormGroup({
      date: new FormControl(null),
      value: new FormControl('')
    });
    
  }
  
  getContratActifs(){
    this.contratService.findAllByStatus(true).subscribe(
      data =>{
        this.isContrat = true;
        this.isMensualite = false;
        this.lists = data;
        console.log(data);
      },
      error =>{
        console.log(error);
      }
    );
  }

  onSubmitSearch(){
    const searchValue = {date:this.searchForm.get('date').value}
    const searchNavigationExtras: NavigationExtras = {
      queryParams:{
        'values':JSON.stringify(searchValue)
      }
    }
    this.route.navigate(['/admin/payments/search'], searchNavigationExtras);
    
  }

  onSubmitSearchContract(){
    this.contratService.searchContract(this.searchForm.get('value').value).subscribe(
      data =>{
        this.lists = data;
        console.log(data);
        this.init();
      },
      error =>{
        console.log(error);
      }
    );
  }


  getMensualites(){
    this.mensualiteService.findAll().subscribe(
      data =>{
        this.mensualites = data;
        this.isMensualite = true;
        this.isContrat = false;
       
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

  onSubmit(numContrat:any){
    const formData = {
      numeroBodereau: this.form.get('numeroBodereau').value,
      montant: this.form.get('montant').value,
      date: this.form.get('date').value
    }

    console.log(numContrat);
    this.mensualiteService.update(formData,numContrat).subscribe(
      data =>{
        console.log(data);
        this.getContratActifs();
        this.clickButton('new-mensualite-close');
      },
      error =>{
        console.log(error);
      }
    );
  }

   clickButton(buttonId: string): void {
    document.getElementById(buttonId)?.click();
  }
}
