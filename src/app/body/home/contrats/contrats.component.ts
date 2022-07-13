import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Contrat } from 'src/app/models/contrat';
import { Locale } from 'src/app/models/locale';
import { Occupation } from 'src/app/models/occupation';
import { ContratService } from 'src/app/services/contrat.service';
import { LocaleService } from 'src/app/services/locale.service';
import { MensualiteService } from 'src/app/services/mensualite.service';
import { OccupationService } from 'src/app/services/occupation.service';

@Component({
  selector: 'app-contrats',
  templateUrl: './contrats.component.html',
  styleUrls: ['./contrats.component.css']
})
export class ContratsComponent implements OnInit {
  lists: Contrat[]=[];
  termines: Contrat[]=[];
  encours: Contrat[]=[];
  types: string[]=[];
  activites: string[]=[];
  mensualites: any[]=[];
  existedContrat:any[]=[];
  occupations: Occupation[]=[];
  form: any ={};
  selectedItem: any ={};
  message?:string;
  p:number=1;
  term: string='';
  private subscriptions: Subscription[] = [];

  constructor(private contratService:ContratService, private activatedRoute: ActivatedRoute,
    private occupationService: OccupationService, private mensualiteService: MensualiteService) { }

  ngOnInit(): void {
    this.types = ['ONG','FONDATION','SOCIETE PRIVE','EGLISE','SOCIETE PUBLIQUE','INDIVIDU'];
    this.activites = ['AGRO-ALIMENTAIRE','TECHNOLOGIE','TELEVISION','TELECOMMUNICATIONS','AGRONOMIE',
  'SERVICES GENERAUX','EDUCATION','MARKETING'];
  this.getAll();
  this.init();
  this.setLocale();
  }

  getAll(){
    this.contratService.findAll().subscribe(
      data =>{
        this.lists = data;
        console.log(data);
      },
      error =>{
        console.log(error);
      }
    );

   
    this.contratService.findAllByStatus(false).subscribe(
      data =>{
        this.termines = data;
        console.log(data);
      },
      error =>{
        console.log(error);
      }
    );

    this.contratService.findAllByStatus(true).subscribe(
      data =>{
        this.encours = data;
        console.log(data);
      },
      error =>{
        console.log(error);
      }
    );
  }

  

  init(){
    this.form = new FormGroup({
      nameClient: new FormControl(''),
      typeClient: new FormControl(''),
      email: new FormControl(''),
      contact: new FormControl(''),
      secteurActivite: new FormControl(''),
      dateSignature: new FormControl(null),
      dureeGaranti: new FormControl(null),
      occupation: new FormControl(null),
      montant: new FormControl(null),
      rccm: new FormControl(''),
      idNumber: new FormControl('')
    });
  }

  setLocale(){
    this.occupationService.findAll().subscribe(
      data =>{
        this.occupations = data;
        console.log(data);
      },
      error =>{
        console.log(error);
      }
    );
  }

  onSubmit(){
    const formData = {
      nameClient: this.form.get('nameClient').value,
      typeClient: this.form.get('typeClient').value,
      email: this.form.get('email').value,
      contact: this.form.get('contact').value,
      secteurActivite: this.form.get('secteurActivite').value,
      dateSignature: this.form.get('dateSignature').value,
      dureeGaranti: this.form.get('dureeGaranti').value,
      id: this.form.get('occupation').value,
      montant: this.form.get('montant').value,
      rccm: this.form.get('rccm').value,
      idNumber: this.form.get('idNumber').value
    }
    if(this.form.get('occupation').value != null || this.form.get('occupation').value != ''){
    this.contratService.findAllByOccupationAndStatus(this.form.get('occupation').value,true).subscribe(
      data => {
        this.existedContrat = data;
        console.log(data);
        if(this.existedContrat.length !=0){
          this.lists = this.existedContrat;
          this.message = 'Vous avez un contrat encours avec '+this.existedContrat[0].clientName+' bienvouloir regularise avant d\'enregistrer un nouveau contrat'; 
          this.clickButton('new-contrat-close');
        }else{
          this.contratService.save(formData).subscribe(
            data => {
              console.log(data);
              this.getAll();
              this.clickButton('new-contrat-close');
              this.init();
            },
            error =>{
              console.log(error);
            }
          );
        }
      },
      error =>{
        console.log(error);
      }
    );
    }else{
      this.contratService.save(formData).subscribe(
        data => {
          console.log(data);
          this.getAll();
          this.clickButton('new-contrat-close');
          this.init();
        },
        error =>{
          console.log(error);
        }
      );
    }
    console.log(this.existedContrat);
    
    
    
  }

  cancelItem(item:any){
    if(confirm('Voulez vous terminer ce contrat??')){
      this.contratService.cancel(item.id).subscribe(
        data => {
          console.log(data);
          this.getAll();
        },
        error =>{
          console.log(error);
        }
      );
    }
  }

  getContratEncour(){
   
    this.contratService.findAllByStatus(true).subscribe(
      data =>{
        this.lists = data;
        console.log(data);
      },
      error =>{
        console.log(error);
      }
    );
  }

  getContratTermine(){
    this.contratService.findAllByStatus(false).subscribe(
      data =>{
        this.lists = data;
        console.log(data);
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
      nameClient: item.nameClient,
      typeClient: item.typeClient,
      email: item.email,
      contact: item.contact,
      secteurActivite: item.secteurActivite,
      dateSignature: item.dateSignature,
      dureeGaranti: item.dureeGaranti,
      occupation: item.locale.designation,
      rccm: item.rccm,
      idNumber: item.idNumber
    });
  }

  detailItem(item:any){
    this.selectedItem = item;
    this.clickButton('openDetail');
  }

  detailMensualite(item:any){
    this.selectedItem = item;
    this.clickButton('openDetailMensualite');
    this.getMensualiteByContrat(item.id);
  }

  getMensualiteByContrat(id:any){
    this.mensualiteService.findAllByContrat(id).subscribe(
      data =>{
        this.mensualites = data;
        console.log(data);
      },
      error =>{
        console.log(error);
      }
    );
  }

  onEditSubmit(id:any){
    const formData = {
      nameClient: this.form.get('nameClient').value,
      typeClient: this.form.get('typeClient').value,
      email: this.form.get('email').value,
      contact: this.form.get('contact').value,
      secteurActivite: this.form.get('secteurActivite').value,
      dateSignature: this.form.get('dateSignature').value,
      dureeGaranti: this.form.get('dureeGaranti').value,
      rccm: this.form.get('rccm').value,
      idNumber: this.form.get('idNumber').value

    }
    this.contratService.update(formData, this.form.get('occupation').value).subscribe(
      data => {
        console.log(data);
        this.getAll();
        this.clickButton('edit-contrat-close');
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
         this.getAll();
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
