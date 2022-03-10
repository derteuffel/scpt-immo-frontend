import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, MaxLengthValidator } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
  form: any ={};
  months: string[]=[];
  private subscriptions: Subscription[] = [];

  constructor(private contratService:ContratService, private activatedRoute: ActivatedRoute,
    private localeService: LocaleService, private mensualiteService: MensualiteService) { }

  ngOnInit(): void {
  this.getContratActifs();
  this.months = ['Janvier','Fevrier','Mars','Avril','Mai','Juin','Juillet','Aout','Septembre','Octobre','Novembre','Decembre'];
  this.init();
  }

  
  init(){
    this.form = new FormGroup({
      numeroBodereau: new FormControl(''),
      mois: new FormControl(''),
      montant: new FormControl('')
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

  getMensualites(){
    this.mensualiteService.findAll().subscribe(
      data =>{
        this.isMensualite = true;
        this.isContrat = false;
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

  onSubmit(numContrat:any){
    const formData = {
      numeroBodereau: this.form.get('numeroBodereau').value,
      montant: this.form.get('montant').value,
      mois: this.form.get('mois').value
    }

    console.log(numContrat);
    this.mensualiteService.save(formData,numContrat).subscribe(
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
