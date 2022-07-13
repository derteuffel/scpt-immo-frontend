import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ContratService } from 'src/app/services/contrat.service';
import { LocaleService } from 'src/app/services/locale.service';
import { MensualiteService } from 'src/app/services/mensualite.service';
import { OccupationService } from 'src/app/services/occupation.service';
import Swal from 'sweetalert2';

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
  currentOccupation: any ={};
  currentLocale: any={};
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
    private occupationService: OccupationService, private mensualiteService: MensualiteService) { }

  ngOnInit(): void {
    this.types = ['ONG','FONDATION','SOCIETE PRIVE','EGLISE','SOCIETE PUBLIQUE','INDIVIDU'];
    this.activites = ['AGRO-ALIMENTAIRE','TECHNOLOGIE','TELEVISION','TELECOMMUNICATIONS','AGRONOMIE',
  'SERVICES GENERAUX','EDUCATION','MARKETING','MALEWA','DIVERS','CABINET PRIVE','TERRASSE',
  'PARKING-VEHICULE','CAFE','EAU PURE','BOISSON','QUINCAILLERIE','RESTAURANT','PEINTURE','AJUSTAGE',
  'SCIERI','BRIQUETTERIE','BOUTIQUE','DEPOTS BOISSON','MECANIQUE','COUTURE','NUMERIQUE',''];
  this.getOccupation(this.activatedRoute.snapshot.paramMap.get('id'));
  this.init();
  }

  getOccupation(id:any){
    this.occupationService.findOne(id).subscribe(
      data =>{
        this.currentOccupation = data;
        this.currentLocale = data.locale;
        console.log(data);
        this.getContratEncour();
      },
      error =>{
        console.log(error);
      }
    );

    this.contratService.findAllByOccupation(id).subscribe(
      data =>{
        this.alls = data;
        console.log(data);
      },
      error =>{
        console.log(error);
      }
    );

    this.contratService.findAllByOccupationAndStatus(id,false).subscribe(
      data =>{
        this.termines = data;
        console.log(data);
      },
      error =>{
        console.log(error);
      }
    );

    this.contratService.findAllByOccupationAndStatus(id,true).subscribe(
      data =>{
        this.encours = data;
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

  init(){
    this.form = new FormGroup({
      nameClient: new FormControl(''),
      typeClient: new FormControl(''),
      email: new FormControl(''),
      contact: new FormControl(''),
      secteurActivite: new FormControl(''),
      dateSignature: new FormControl(null),
      dureeGaranti: new FormControl(null),
      rccm: new FormControl(''),
      idNumber: new FormControl('')
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
          this.lists = this.existedContrat;
          this.message = 'Vous avez un contrat encours avec '+this.existedContrat[0].nameClient+' bienvouloir regularise avant d\'enregistrer un nouveau contrat'; 
          this.clickButton('new-contrat-close');
        }else{
          this.contratService.save(formData).subscribe(
            data => {
              console.log(data);
              Swal.fire('Thank you...', 'You submitted succesfully!', 'success').then((res)=>{
                if(res.isConfirmed){
              this.getOccupation(this.currentOccupation.id);
              this.clickButton('new-contrat-close');
              this.init();
                }});
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
          this.getContratByOccupation();
          this.getContratEncour();
          this.getContratTermine();
        },
        error =>{
          console.log(error);
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
         this.getOccupation(this.currentLocale.id);
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
    this.init();
  }

}
