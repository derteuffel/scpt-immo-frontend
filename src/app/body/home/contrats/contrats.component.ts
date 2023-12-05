import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription, interval } from 'rxjs';
import { constant } from 'src/app/constant';
import { Contrat } from 'src/app/models/contrat';
import { Locale } from 'src/app/models/locale';
import { Occupation } from 'src/app/models/occupation';
import { ContratService } from 'src/app/services/contrat.service';
import { LocaleService } from 'src/app/services/locale.service';
import { MensualiteService } from 'src/app/services/mensualite.service';
import { OccupationService } from 'src/app/services/occupation.service';
import { TokenService } from 'src/app/services/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contrats',
  templateUrl: './contrats.component.html',
  styleUrls: ['./contrats.component.css']
})
export class ContratsComponent implements OnInit,OnDestroy {
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
  checkSub?:Subscription;

  constructor(private contratService:ContratService, private tokenService: TokenService,
    private occupationService: OccupationService, private mensualiteService: MensualiteService) { }
  ngOnDestroy(): void {
    this.checkSub?.unsubscribe();
  }

  ngOnInit(): void {
    this.checkSub = interval(300000).subscribe((func =>{
      this.tokenService.checkConnected();
    }))
    this.types = constant.TYPE_CLIENT;
    this.activites = constant.ACTIVITE;
  this.getAll();
  this.init();
  this.setLocale();
  }

  getAll(){
    this.tokenService.checkConnected();
    this.contratService.findAll().subscribe(
      data =>{
        this.lists = data;
      },
      error =>{
        Swal.fire('Ooops...', 'Une erreur est survenue'+error, 'error')
      }
    );


    this.contratService.findAllByStatus(false).subscribe(
      data =>{
        this.termines = data;
        console.log(data);
      },
      error =>{
        Swal.fire('Ooops...', 'Une erreur est survenue'+error, 'error')
      }
    );

    this.contratService.findAllByStatus(true).subscribe(
      data =>{
        this.encours = data;
        console.log(data);
      },
      error =>{
        Swal.fire('Ooops...', 'Une erreur est survenue'+error, 'error')
      }
    );
  }



  init(){
    this.form = new UntypedFormGroup({
      nameClient: new UntypedFormControl(''),
      typeClient: new UntypedFormControl(''),
      email: new UntypedFormControl(''),
      contact: new UntypedFormControl(''),
      secteurActivite: new UntypedFormControl(''),
      dateSignature: new UntypedFormControl(null),
      dureeGaranti: new UntypedFormControl(null),
      occupation: new UntypedFormControl(null),
      montant: new UntypedFormControl(null),
      rccm: new UntypedFormControl(''),
      idNumber: new UntypedFormControl('')
    });
  }

  setLocale(){
    this.occupationService.findAll().subscribe(
      data =>{
        this.occupations = data;
        console.log(data);
      },
      error =>{
        Swal.fire('Ooops...', 'Une erreur est survenue'+error, 'error')
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
          this.clickButton('new-contrat-close');
          Swal.fire('Conflit d\'interet', 'Vous avez un contrat encours avec '+this.existedContrat[0].clientName+' bienvouloir regularise avant d\'enregistrer un nouveau contrat', 'warning')
            .then((result)=>{
              if(result.isConfirmed){
                this.lists = this.existedContrat;
              }
            })
        }else{
          this.contratService.save(formData).subscribe(
            data => {
              console.log(data);
              this.clickButton('new-contrat-close');
              Swal.fire('Thank you...', 'You saved contract succesfully!', 'success')
              .then((result)=>{
                if(result.isConfirmed){
                  this.getAll();
                  this.init();
                }
              })

            },
            error =>{
             Swal.fire('Ooops...', 'Une erreur est survenue'+error, 'error')
              
            }
          );
        }
      },
      error =>{
        Swal.fire('Ooops...', 'Une erreur est survenue'+error, 'error')
      }
    );
    }else{
      this.contratService.save(formData).subscribe(
        data => {
          console.log(data);
          this.clickButton('new-contrat-close');
          Swal.fire('Thank you....', 'You have save the contract successfuly', 'success')
            .then((result)=>{
              if(result.isConfirmed){
                this.getAll();

                this.init();
              }
            })

        },
        error =>{
          Swal.fire('Ooops...', 'Une erreur est survenue'+error, 'error')
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
          Swal.fire('Ooops...', 'Une erreur est survenue'+error, 'error')
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
        Swal.fire('Ooops...', 'Une erreur est survenue'+error, 'error')
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
        Swal.fire('Ooops...', 'Une erreur est survenue'+error, 'error')
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
    this.mensualiteService.findAllByFacture(id).subscribe(
      data =>{
        this.mensualites = data;
        console.log(data);
      },
      error =>{
        Swal.fire('Ooops...', 'Une erreur est survenue'+error, 'error')
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
        this.clickButton('edit-contrat-close');
        Swal.fire('Thank you....', 'You have save the contract successfuly', 'success')
            .then((result)=>{
              if(result.isConfirmed){
                this.getAll();
                        }
            })

      },
      error =>{
        Swal.fire('Ooops...', 'Une erreur est survenue'+error, 'error')
        
      }
    );
  }

  deleteItem(id:any){
    if(confirm('Etes vous sur de vouloir supprimer ce contrat?')){
    this.subscriptions.push(

      this.contratService.delete(id).subscribe(
        (response) => {
         console.log(response);
         Swal.fire('Thank you....', 'You have deleted the contract successfuly', 'success')
            .then((result)=>{
              if(result.isConfirmed){
                this.getAll();
                        }
            })
        },
        (error: HttpErrorResponse) => {
          Swal.fire('Ooops...', 'Une erreur est survenue'+error, 'error')
        }
      )
    );
   }
  }

   clickButton(buttonId: string): void {
    document.getElementById(buttonId)?.click();
  }

}
