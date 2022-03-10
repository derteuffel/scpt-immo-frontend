import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ContratService } from 'src/app/services/contrat.service';
import { LocaleService } from 'src/app/services/locale.service';
import { MensualiteService } from 'src/app/services/mensualite.service';

@Component({
  selector: 'app-representation-locale-contrat',
  templateUrl: './representation-locale-contrat.component.html',
  styleUrls: ['./representation-locale-contrat.component.css']
})
export class RepresentationLocaleContratComponent implements OnInit {


  lists: any[]=[];
  alls:any[]=[];
  termines: any[]=[];
  encours: any[]=[];
  currentLocale: any ={};
  types: string[]=[];
  activites: string[]=[];
  mensualites: any[]=[];
  form: any ={};
  selectedItem: any ={};
  message?:string;
  existedContrat:any[]=[];
  p:number=1;
  private subscriptions: Subscription[] = [];

  constructor(private contratService:ContratService, private activatedRoute: ActivatedRoute,
    private localeService: LocaleService, private mensualiteService: MensualiteService) { }

  ngOnInit(): void {
    this.types = ['ONG','FONDATION','SOCIETE PRIVE','EGLISE','SOCIETE PUBLIQUE','INDIVIDU'];
    this.activites = ['AGRO-ALIMENTAIRE','TECHNOLOGIE','TELEVISION','TELECOMMUNICATIONS','AGRONOMIE',
  'SERVICES GENERAUX','EDUCATION','MARKETING'];
  this.getlocale(this.activatedRoute.snapshot.paramMap.get('id'));
  this.init();
  }

  getlocale(id:any){
    this.localeService.findOne(id).subscribe(
      data =>{
        this.currentLocale = data;
        console.log(data);
        this.getContratEncour();
      },
      error =>{
        console.log(error);
      }
    );

    this.contratService.findAllByLocale(id).subscribe(
      data =>{
        this.alls = data;
        console.log(data);
      },
      error =>{
        console.log(error);
      }
    );

    this.contratService.findAllByLocaleAndStatus(id,false).subscribe(
      data =>{
        this.termines = data;
        console.log(data);
      },
      error =>{
        console.log(error);
      }
    );

    this.contratService.findAllByLocaleAndStatus(id,true).subscribe(
      data =>{
        this.encours = data;
        console.log(data);
      },
      error =>{
        console.log(error);
      }
    );
  }

  getContratByLocale(){
    this.contratService.findAllByLocale(this.currentLocale.id).subscribe(
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
      nameClient: new FormControl(''),
      typeClient: new FormControl(''),
      email: new FormControl(''),
      contact: new FormControl(''),
      secteurActivite: new FormControl(''),
      dateSignature: new FormControl(null),
      dureeGaranti: new FormControl(null)
    });
  }

  onSubmit(){
    const formData = {
      nameClient: this.form.get('nameClient').value,
      typeClient: this.form.get('typeClient').value,
      email: this.form.get('email').value,
      contact: this.form.get('contact').value,
      secteurActivite: this.form.get('secteurActivite').value,
      dateSignature: this.form.get('dateSignature').value,
      dureeGaranti: this.form.get('dureeGaranti').value
    }
    this.contratService.findAllByLocaleAndStatus(this.form.get('locale').value,true).subscribe(
      data => {
        this.existedContrat = data;
        console.log(data);
        if(this.existedContrat.length !=0){
          this.lists = this.existedContrat;
          this.message = 'Vous avez un contrat encours avec '+this.existedContrat[0].clientName+' bienvouloir regularise avant d\'enregistrer un nouveau contrat'; 
          this.clickButton('new-contrat-close');
        }else{
          this.contratService.save(formData, this.currentLocale.id).subscribe(
            data => {
              console.log(data);
              this.getlocale(this.currentLocale.id);
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
  }

  cancelItem(item:any){
    if(confirm('Voulez vous terminer ce contrat??')){
      this.contratService.cancel(item.id).subscribe(
        data => {
          console.log(data);
          this.getContratByLocale();
        },
        error =>{
          console.log(error);
        }
      );
    }
  }

  getContratEncour(){
    this.contratService.findAllByLocaleAndStatus(this.currentLocale.id,true).subscribe(
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
    this.contratService.findAllByLocaleAndStatus(this.currentLocale.id,false).subscribe(
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
      dureeGaranti: item.dureeGaranti
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
      dureeGaranti: this.form.get('dureeGaranti').value
    }
    this.contratService.update(formData, id).subscribe(
      data => {
        console.log(data);
        this.getlocale(this.currentLocale.id);
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
         this.getlocale(this.currentLocale.id);
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
