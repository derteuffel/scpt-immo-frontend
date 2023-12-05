import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription, interval } from 'rxjs';
import { ContratService } from 'src/app/services/contrat.service';
import { LocaleService } from 'src/app/services/locale.service';
import { MensualiteService } from 'src/app/services/mensualite.service';
import { OccupationService } from 'src/app/services/occupation.service';
import Swal from 'sweetalert2';
import {constant} from "../../../constant";
import {Contrat} from "../../../models/contrat";
import {Dossier} from "../../../models/dossier";
import {DossierService} from "../../../services/dossier/dossier.service";
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-representation-locale-contrat',
  templateUrl: './representation-locale-contrat.component.html',
  styleUrls: ['./representation-locale-contrat.component.css']
})
export class RepresentationLocaleContratComponent implements OnInit {


  lists: Contrat[]=[];
  dossiers: Dossier[]=[];
  alls = 0;
  allsDossiers = 0;
  termines = 0;
  aboutis: number=0;
  dossiersEncours: number=0;
  encours=0;
  rejeters: number=0;
  currentOccupation: any ={};
  currentLocale: any={};
  types: string[]=[];
  typesContrat: string[]=[];
  activites: string[]=[];
  mensualites: any[]=[];
  form: any ={};
  dossierForm: any ={};
  selectedItem: any ={};
  message?:string;
  existedContrat:any[]=[];
  p:number=1;
  p1:number=1;
  private subscriptions: Subscription[] = [];
  checkSub?: Subscription;

  constructor(private contratService:ContratService, private activatedRoute: ActivatedRoute,
    private occupationService: OccupationService, private mensualiteService: MensualiteService,
              private dossierService:DossierService,private tokenService: TokenService) { }

  ngOnInit(): void {

    this.types = ['ONG','FONDATION','SOCIETE PRIVE','EGLISE','SOCIETE PUBLIQUE','INDIVIDU'];
    this.activites = constant.ACTIVITE;
  this.getOccupation(this.activatedRoute.snapshot.paramMap.get('id'));
  this.typesContrat = ['LOCATION',"EXPLOITATION"];
  this.init();
  }

  getOccupation(id:any){
    this.occupationService.findOne(id).subscribe(
      data =>{
        this.currentOccupation = data;
        this.currentLocale = data.locale;
        console.log(data);
        this.getContratEncour();
        this.getDossierByOccupation();
      },
      error =>{
        console.log(error);
      }
    );

    this.contratService.findAllByOccupation(id).subscribe(
      data =>{
        if(data.length != null){
          this.alls = data.length;
        }
        
        console.log(data);
      },
      error =>{
        console.log(error);
      }
    );
    this.dossierService.findAllByOccupation(id).subscribe(
      data =>{
        console.log(data);
        if(data != null){
          this.allsDossiers = data.length;
        }
        
      },
      error =>{
        console.log(error);
      }
    );

    this.contratService.findAllByOccupationAndStatus(id,false).subscribe(
      data =>{
        if(data.length != null){
          this.termines = data.length;
        }
        console.log(data);
      },
      error =>{
        console.log(error);
      }
    );

    this.contratService.findAllByOccupationAndStatus(id,true).subscribe(
      data =>{
        if(data.length != null){
          this.encours = data.length;
        }
        console.log(data);
      },
      error =>{
        console.log(error);
      }
    );
    this.dossierService.findAllByStatusAndOccupation("ACCORDER",id).subscribe(
      data =>{
        if(data != null){
          this.aboutis = data.length;
        }
        
        console.log(data);
      },
      error =>{
        console.log(error);
      }
    );

    this.dossierService.findAllByStatusAndOccupation("REJETTER",id).subscribe(
      data =>{
        if(data != null){
          this.rejeters = data.length;
        }
        
        console.log(data);
      },
      error =>{
        console.log(error);
      }
    );
    this.dossierService.findAllByStatusAndOccupation("ENCOURS",id).subscribe(
      data =>{
        if(data != null){
          this.dossiersEncours = data.length;
        }
        
        console.log(data);
      },
      error =>{
        console.log(error);
      }
    );
  }

  getContratByOccupation(){
    this.contratService.findAllByOccupation(this.currentOccupation.id).subscribe(
      data => {
        this.lists = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }
  getDossierByOccupation(){
    this.dossierService.findAllByOccupation(this.currentOccupation.id).subscribe(
      data => {
        this.dossiers = data;
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
      typeContrat: new FormControl(''),
      email: new FormControl(''),
      contact: new FormControl(''),
      secteurActivite: new FormControl(''),
      dateSignature: new FormControl(null),
      dureeGaranti: new FormControl(null),
      rccm: new FormControl(''),
      idNumber: new FormControl('')
    });
    this.dossierForm = new FormGroup({
      nomDemandeur: new FormControl(""),
      telephone: new FormControl(""),
      typeDossier: new FormControl(""),
      email: new FormControl(""),
      activite: new FormControl(""),
      raisonSocial: new FormControl(""),
    })
  }

  onSubmit(){
    const formData = {
      nameClient: this.form.get('nameClient').value,
      typeClient: this.form.get('typeClient').value,
      typeContrat: this.form.get('typeContrat').value,
      email: this.form.get('email').value,
      contact: this.form.get('contact').value,
      secteurActivite: this.form.get('secteurActivite').value,
      dateSignature: this.form.get('dateSignature').value,
      dureeGaranti: this.form.get('dureeGaranti').value,
      rccm: this.form.get('rccm').value,
      idNumber: this.form.get('idNumber').value,
      id: this.currentOccupation.id,
      montant: this.currentOccupation.montantOccupation
    }

    this.contratService.findAllByOccupationAndStatus(this.currentOccupation.id,true).subscribe(
      data => {
        this.existedContrat = data;
        console.log(data);
        if(this.existedContrat.length !=0){
          this.clickButton('new-contrat-close');
          Swal.fire('Ooops...', 'Vous avez un contrat encours avec '+this.existedContrat[0].nameClient+' bienvouloir regularise avant d\'enregistrer un nouveau contrat', 'warning').then((res)=>{
            if(res.isConfirmed){
              this.lists = this.existedContrat;
            }});
        }else{
          this.contratService.save(formData).subscribe(
            data => {
              console.log(data);
              this.clickButton('new-contrat-close');
              Swal.fire('Thank you...', 'You submitted succesfully!', 'success').then((res)=>{
                if(res.isConfirmed){
                  this.getOccupation(this.currentOccupation.id);

                  this.init();
                }});
            },
            error =>{
              console.log(error);
              Swal.fire('Ooops...', 'Internal error occured while saving ', 'error');

            }
          );
        }
      },
      error =>{
        console.log(error);
        Swal.fire('Ooops...', 'You cannot add new contract without ending the other one ', 'error');
      }
    );
  }
  onSubmitDossier(){
    const formData = {
      "nomDemandeur": this.dossierForm.get('nomDemandeur').value,
      "telephone": this.dossierForm.get('telephone').value,
      "email": this.dossierForm.get('email').value,
      "activite": this.dossierForm.get('activite').value,
      "typeDossier": this.dossierForm.get('typeDossier').value,
      "raisonSocial": this.dossierForm.get('raisonSocial').value,
      "status": "ENCOURS",
      "occupationId":this.currentOccupation.id
    }
    this.dossierService.save(formData).subscribe(
      data => {
        console.log(data);
        this.clickButton('new-dossier-close');
        Swal.fire('Thank you...', 'You submitted succesfully!', 'success').then((res)=>{
          if(res.isConfirmed){
            this.getOccupation(this.currentOccupation.id);

            this.init();
          }});
      },
      error =>{
        console.log(error);
        Swal.fire('Ooops...', 'Internal error occured while saving ', 'error');

      }
    );
  }

  cancelItem(item:any){
    if(confirm('Voulez vous terminer ce contrat??')){
      this.contratService.cancel(item.id).subscribe(
        data => {
          console.log(data);

          Swal.fire('Thank you...', 'You submitted succesfully!', 'success').then((res)=>{
            if(res.isConfirmed){
              this.getContratByOccupation();
              this.getContratEncour();
              this.getContratTermine();
            }});
        },
        error =>{
          console.log(error);
          Swal.fire('Ooops...', 'Internal error occured while ending this contract ', 'error');
        }
      );
    }
  }
  cancelDossier(item:any){
    if(confirm('Voulez vous Interrompre le traitement de ce dossier??')){
      this.contratService.cancel(item.id).subscribe(
        data => {
          console.log(data);

          Swal.fire('Thank you...', 'You submitted succesfully!', 'success').then((res)=>{
            if(res.isConfirmed){
              this.getDossierByOccupation();
              this.getDossierEncour();
              this.getDossierRejetter();
              this.getDossierAccorder();
            }});
        },
        error =>{
          console.log(error);
          Swal.fire('Ooops...', 'Internal error occured while ending this Dossier ', 'error');
        }
      );
    }
  }

  getContratEncour(){
    this.contratService.findAllByOccupationAndStatus(this.currentOccupation.id,true).subscribe(
      data =>{
        this.lists = data;
        console.log(data);
      },
      error =>{
        console.log(error);
      }
    );
  }
  getDossierEncour(){
    this.dossierService.findAllByStatusAndOccupation("ENCOURS",this.currentOccupation.id).subscribe(
      data =>{
        this.dossiers = data;
        console.log(data);
      },
      error =>{
        console.log(error);
      }
    );
  }

  getContratTermine(){
    this.contratService.findAllByOccupationAndStatus(this.currentOccupation.id,false).subscribe(
      data =>{
        this.lists = data;
        console.log(data);
      },
      error =>{
        console.log(error);
      }
    );
  }
  getDossierRejetter(){
    this.dossierService.findAllByStatusAndOccupation("REJETTER",this.currentOccupation.id).subscribe(
      data =>{
        this.dossiers = data;
        console.log(data);
      },
      error =>{
        console.log(error);
      }
    );
  }
  getDossierAccorder(){
    this.dossierService.findAllByStatusAndOccupation("ACCORDER",this.currentOccupation.id).subscribe(
      data =>{
        this.dossiers = data;
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
      rccm: item.rccm,
      idNumber: item.idNumber
    });
  }
  editDossier(item:any){
    this.selectedItem = item;
    this.clickButton('openEditDossier');
    this.dossierForm.patchValue({
      nomDemandeur: item.nomDemandeur,
      activite: item.activite,
      email: item.email,
      telephone: item.telephone,
      raisonSocial: item.raisonSocial,
      status:item.status,
      files: item.files,
      dateCreation: item.dateCreation,
      code: item.code,
      id:item.id
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
    this.mensualiteService.findAllByFacture(id).subscribe(
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
      idNumber: this.form.get('idNumber').value,
    }
    Swal.fire({
      title: 'Are you sure you want to save changes?',
      text: 'The change will take effect after submit button pressed',
      icon: 'warning',
      showCancelButton:true,
      showConfirmButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result)=>{
      if(result.isConfirmed){
    this.contratService.update(formData, id).subscribe(
      data => {
        console.log(data);
        Swal.fire('Thank you...', 'You submitted succesfully!', 'success').then((res)=>{
          if(res.isConfirmed){
        this.init();
        this.getOccupation(this.currentOccupation.id);
        this.clickButton('edit-contrat-close');
          }});
      },
      error =>{
        console.log(error);
        Swal.fire('Ooops...', 'Internal error occured while updating this contract ', 'error');

      }
    );
      }});
  }
  onEditSubmitDossier(id:any){

    Swal.fire({
      title: 'Are you sure you want to save changes?',
      text: 'The change will take effect after submit button pressed',
      icon: 'warning',
      showCancelButton:true,
      showConfirmButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result)=>{
      if(result.isConfirmed){
    this.dossierService.update(this.dossierForm.value).subscribe(
      data => {
        console.log(data);
        Swal.fire('Thank you...', 'You submitted succesfully!', 'success').then((res)=>{
          if(res.isConfirmed){
        this.init();
        this.getOccupation(this.currentOccupation.id);
        this.clickButton('edit-dossier-close');
          }});
      },
      error =>{
        console.log(error);
        Swal.fire('Ooops...', 'Internal error occured while updating this dossier ', 'error');

      }
    );
      }});
  }

  deleteItem(id:any){
    if(confirm('Etes vous sur de vouloir supprimer ce contrat?')){
    this.subscriptions.push(

      this.contratService.delete(id).subscribe(
        (response) => {
         console.log(response);
         Swal.fire('Thank you...', 'You submitted succesfully!', 'success').then((res)=>{
          if(res.isConfirmed){
            this.getOccupation(this.currentLocale.id);
          }});

        },
        (error: HttpErrorResponse) => {
          console.log(error.error.message);
          Swal.fire('Ooops...', 'Internal error occured while deleting this contract ', 'error');

        }
      )
    );
   }
  }
  deleteDossier(id:any){
    if(confirm('Etes vous sur de vouloir supprimer ce dossier?')){
    this.subscriptions.push(

      this.dossierService.delete(id).subscribe(
        (response) => {
         console.log(response);
         Swal.fire('Thank you...', 'You submitted succesfully!', 'success').then((res)=>{
          if(res.isConfirmed){
            this.getOccupation(this.currentLocale.id);
          }});

        },
        (error: HttpErrorResponse) => {
          console.log(error.error.message);
          Swal.fire('Ooops...', 'Internal error occured while deleting this contract ', 'error');

        }
      )
    );
   }
  }

   clickButton(buttonId: string): void {
    document.getElementById(buttonId)?.click();
    this.init();
  }

}
