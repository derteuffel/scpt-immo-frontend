import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ContratService } from 'src/app/services/contrat.service';
import { LocaleService } from 'src/app/services/locale.service';
import { MensualiteService } from 'src/app/services/mensualite.service';
import Swal from 'sweetalert2';

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
  produceForm: any = {};
  selectedItem: any ={};
  message?:string;
  existedContrat:any[]=[];
  p:number=1;

  file: any;
  billFile: any;
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

    this.produceForm = new FormGroup({
      date: new FormControl(null)
    })
  }

  onSubmit(){
    const formData = new FormData();
      formData.append('numeroBodereau', this.form.get('numeroBodereau').value);
      formData.append('montant', this.form.get('montant').value);
      formData.append('date', this.form.get('date').value);
      if(this.billFile==null || this.billFile == undefined){
        console.log('error upload file');
        console.log(this.billFile);
        Swal.fire('Ooops...', 'Error while charging file  ', 'error');
      }else{
          console.log('i contain file');
          formData.append('file',this.billFile);
          this.mensualiteService.update(formData,this.currentContrat.id).subscribe(
            data => {
             console.log(data);
             
             this.clickButton('new-payment-close');
             Swal.fire('Thank you...', 'You submitted succesfully!', 'success').then((res)=>{
              if(res.isConfirmed){
                this.getAllMensualites();
                this.getAllFalseMensualites();
                this.getAllTrueMensualites();
                this.init();
                      }});
            },
            error =>{
              console.log(error);
              Swal.fire('Ooops...', 'Internal error occured while updating this payement ', 'error');
      
            }
          ); 
      }

       
  }

  

  onProduce(){
    if(confirm('Do you really want to produce bill?')){
    this.contratService.produceFacture(this.currentContrat.id).subscribe(
      data =>{
        
        Swal.fire('Thank you...', 'Your bill has been produced succesfully!', 'success').then((res)=>{
          if(res.isConfirmed){
            window.location.reload();
             this.init();
                  }});
      },
      error =>{
        console.log(error);
        Swal.fire('Ooops...', 'Internal error occured while producing bill ', 'error');

      }
    );
  }
  }

  produceContract(){
    
    const formData = new FormData();
    if(this.file==null || this.file == undefined){
      console.log('error upload file');
    }else{
        console.log('i contain file');
        formData.append('file',this.file);
    }
      this.contratService.produceContract(formData, this.currentContrat.id).subscribe(
        data  =>{
          console.log('save successfuly');
          
          Swal.fire('Thank you...', 'Your contract has been produced succesfully!', 'success').then((res)=>{
            if(res.isConfirmed){
              window.location.reload();
                    }});
        },
        error =>{
          console.log(error);
          Swal.fire('Ooops...', 'Internal error occured while producing contract ', 'error');

        }
      );
  }

  onChange(event:any){
    this.file = event.target.files.item(0);
  }

  selectFile(event:any){
    this.billFile = event.target.files.item(0);
  }

  uploadQuitance(event:any){
    this.billFile = event.target.files.item(0);
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

  addQuitance(item:any){
    this.selectedItem = item;
    this.clickButton('openAddQuitance');
  }

  onSubmitQuitance(event:any){

    const formData = new FormData();
    formData.append('file',this.billFile);
    this.mensualiteService.uploadQuitance(formData, event).subscribe(
      data =>{
        
        this.clickButton('add-quitance-close');
        Swal.fire('Thank you...', 'You uploaded your quittance succesfully!', 'success').then((res)=>{
          if(res.isConfirmed){
            this.getAllMensualites();
          }});
      },
      error =>{
        console.log(error);
        Swal.fire('Ooops...', 'Internal error occured while uploading quittance ', 'error');

      }
    );

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
        this.clickButton('edit-payment-close');
        Swal.fire('Thank you...', 'You edited your payment succesfully!', 'success').then((res)=>{
          if(res.isConfirmed){
            this.getAllMensualites();
          }});
      },
      error =>{
        console.log(error);
        Swal.fire('Ooops...', 'Internal error occured while editing payment ', 'error');

      }
    );
  }

  deleteItem(id:any){
    if(confirm('Etes vous sur de vouloir supprimer ce contrat?')){
    this.subscriptions.push(

      this.contratService.delete(id).subscribe(
        (response) => {
         console.log(response);
         Swal.fire('Thank you...', 'You deleted your contract succesfully!', 'success').then((res)=>{
          if(res.isConfirmed){
            this.getAllMensualites();
          }});
        },
        (error: HttpErrorResponse) => {
          console.log(error.error.message);
          Swal.fire('Ooops...', 'Internal error occured while deleting contract ', 'error');
        }
      )
    );
   }
  }

   clickButton(buttonId: string): void {
    document.getElementById(buttonId)?.click();
  }

}
