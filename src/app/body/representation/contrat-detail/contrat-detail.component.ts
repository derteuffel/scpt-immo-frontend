import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ContratService } from 'src/app/services/contrat.service';
import { LocaleService } from 'src/app/services/locale.service';
import { MensualiteService } from 'src/app/services/mensualite.service';

@Component({
  selector: 'app-contrat-detail',
  templateUrl: './contrat-detail.component.html',
  styleUrls: ['./contrat-detail.component.css']
})
export class ContratDetailComponent implements OnInit {
  lists: any[]=[];
  alls:any[]=[];
  termines: any[]=[];
  encours: any[]=[];
  currentOccupation: any ={};
  currentContrat: any ={};
  types: string[]=[];
  activites: string[]=[];
  effectues: any[]=[];
  nonEffectues: any[]=[];
  form: any ={};
  selectedItem: any ={};
  message?:string;
  existedContrat:any[]=[];
  p:number=1;
  private subscriptions: Subscription[] = [];

  constructor(private contratService:ContratService, private activatedRoute: ActivatedRoute,
    private localeService: LocaleService, private mensualiteService: MensualiteService) { }

  ngOnInit(): void {
  this.getContrat(this.activatedRoute.snapshot.paramMap.get('id'));
  this.init();
  }

  getContrat(id:any){
    this.contratService.findOne(id).subscribe(
      data =>{
        this.currentContrat = data;
        this.currentOccupation = data.occupation;
        console.log(data);
        this.getAllMensualites();
      },
      error =>{
        console.log(error);
      }
    );

    this.mensualiteService.findAllByContrat(id).subscribe(
      data =>{
        this.alls = data;
        console.log(data);
      },
      error =>{
        console.log(error);
      }
    );

    this.mensualiteService.findAllByStatusAndContrat(id,false).subscribe(
      data =>{
        this.nonEffectues = data;
        console.log(data);
      },
      error =>{
        console.log(error);
      }
    );

    this.mensualiteService.findAllByStatusAndContrat(id,true).subscribe(
      data =>{
        this.effectues = data;
        console.log(data);
      },
      error =>{
        console.log(error);
      }
    );
  }

  getAllTrueMensualites(){
    this.mensualiteService.findAllByStatusAndContrat(this.currentContrat.id,true).subscribe(
      data => {
        this.lists = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }


  getAllFalseMensualites(){
    this.mensualiteService.findAllByStatusAndContrat(this.currentContrat.id,false).subscribe(
      data => {
        this.lists = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

  init(){
    this.form = new FormGroup({
      numeroBodereau: new FormControl(''),
      montant: new FormControl(null),
      date: new FormControl(null)
    });
  }

  onSubmit(){
    const formData = {
      numeroBodereau: this.form.get('numeroBodereau').value,
      montant: this.form.get('montant').value,
      date: this.form.get('date').value
    }
    this.mensualiteService.update(formData,this.currentContrat.id).subscribe(
      data => {
       console.log(data);
       this.getAllMensualites();
       this.init();
       this.clickButton('new-payment-close');
      },
      error =>{
        console.log(error);
      }
    );    
  }

 

  editItem(item:any){
    this.selectedItem = item;
    this.clickButton('openEdit');
    this.form.patchValue({
      numeroBodereau: item.numeroBodereau,
      montant: item.montant,
      date: item.date
    });
  }

 

  getAllMensualites(){
    this.mensualiteService.findAllByContrat(this.currentContrat.id).subscribe(
      data =>{
        this.lists = data;
        console.log(data);
      },
      error =>{
        console.log(error);
      }
    );
  }

  onEditSubmit(id:any){
    const formData = {
      numeroBodereau: this.form.get('numeroBodereau').value,
      montant: this.form.get('montant').value,
      date: this.form.get('date').value
    }
    this.contratService.update(formData, id).subscribe(
      data => {
        console.log(data);
        this.getAllMensualites();
        this.clickButton('edit-payment-close');
      },
      error =>{
        console.log(error);
      }
    );
  }

  deleteItem(id:any){
    if(confirm('Etes vous sur de vouloir supprimer ce contrat?')){
    this.subscriptions.push(

      this.contratService.delete(id).subscribe(
        (response) => {
         console.log(response);
         this.getAllMensualites();
        },
        (error: HttpErrorResponse) => {
          console.log(error.error.message);
        }
      )
    );
   }
  }

   clickButton(buttonId: string): void {
    document.getElementById(buttonId)?.click();
  }

}
