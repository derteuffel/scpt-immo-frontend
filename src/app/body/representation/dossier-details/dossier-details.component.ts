import { Component, OnInit } from '@angular/core';
import {Dossier} from "../../../models/dossier";
import {DossierService} from "../../../services/dossier/dossier.service";
import {EtapeService} from "../../../services/etape/etape.service";
import {Etape} from "../../../models/etape";
import {UntypedFormControl, UntypedFormGroup} from "@angular/forms";
import Swal from "sweetalert2";
import {HttpErrorResponse} from "@angular/common/http";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {actions, services, typeEtapes} from "../../../constant";
import {ContratService} from "../../../services/contrat.service";

@Component({
  selector: 'app-dossier-details',
  templateUrl: './dossier-details.component.html',
  styleUrls: ['./dossier-details.component.css']
})
export class DossierDetailsComponent implements OnInit {

  currentDossier!: Dossier;
  lists:Etape[]=[];
  p:number = 1;
  form:any={};
  types: string[]=[];
  actions: string[]=[];
  services: string[]=[];
  uploadedFile:any;
  selectedFiles?: FileList;
  imgURL:any;
  selectedItem:any;

  term:string='';

  private subscriptions: Subscription[] = [];

  constructor(private dossierService:DossierService, private etapeService: EtapeService,
              private activatedRoute: ActivatedRoute, private contratService: ContratService) { }

  ngOnInit(): void {
    this.init();
    this.getDossier(this.activatedRoute.snapshot.paramMap.get('id'));
    this.actions = actions;
    this.services = services;
    this.types = typeEtapes;
  }

  getEtapes(id:any){
    this.etapeService.findAllByDossier(id).subscribe(
      data =>{
        this.lists = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

  getDossier(id:any){
    this.dossierService.findOne(id).subscribe(
      data =>{
        this.currentDossier = data;
        console.log(data);
        this.getEtapes(data.id);
      },
      error => {
        console.log(error);
      }
    );
  }

  init(){
    this.form = new UntypedFormGroup({
      observation: new UntypedFormControl(''),
      action: new UntypedFormControl(''),
      service: new UntypedFormControl(''),
      type: new UntypedFormControl(''),
      id: new UntypedFormControl(null)
    })
    this.imgURL = "";
    this.uploadedFile = null;
  }

  selectFile(event:any) {
    this.selectedFiles = event.target.files;
    this.imgURL = event.target.files.item(0).name;
  }

  onSubmit(){
    this.uploadedFile = this.selectedFiles?.item(0);
    const formData:FormData = new FormData();

    formData.append("service",this.form.get('service').value);
    formData.append("action",this.form.get('action').value);
    formData.append("dossierId",this.currentDossier.id+"");
    formData.append("type",this.form.get('type').value);
    formData.append("observation",this.form.get('observation').value);
    if(this.uploadedFile != null || this.uploadedFile != undefined){
      formData.append('multipartFile', this.uploadedFile);
    }
    this.etapeService.save(formData).subscribe(
      data =>{
        this.clickButton('new-etape-close');
        Swal.fire('Thank you...', 'You submitted succesfully!', 'success').then((res)=>{
          if(res.isConfirmed){
            this.getDossier(this.currentDossier.id);

            this.init();
          }});
      },
      error => {
        Swal.fire('Ooops...', 'Internal error occured while saving ', 'error');
      }
    );
  }
  onUpdate(){
    this.uploadedFile = this.selectedFiles?.item(0);
    const formData:FormData = new FormData();

    formData.append("service",this.form.get('service').value);
    formData.append("action",this.form.get('action').value);
    formData.append("type",this.form.get('type').value);
    formData.append("observation",this.form.get('observation').value);
    formData.append("id",this.form.get('id').value);
    if(this.uploadedFile != null || this.uploadedFile != undefined){
      formData.append('multipartFile', this.uploadedFile);
    }
    this.etapeService.update(formData).subscribe(
      data =>{
        this.clickButton('edit-etape-close');
        Swal.fire('Thank you...', 'You submitted succesfully!', 'success').then((res)=>{
          if(res.isConfirmed){
            this.getDossier(this.currentDossier.id);

            this.init();
          }});
      },
      error => {
        Swal.fire('Ooops...', 'Internal error occured while saving ', 'error');
      }
    );
  }

  onProduceContract(){
    this.contratService.generateContract(this.currentDossier.id).subscribe(
      data =>{
        this.clickButton("produire-contrat-close");
        Swal.fire('Thank you...', 'You submitted succesfully!', 'success').then((res)=>{
          if(res.isConfirmed){
            this.getDossier(this.currentDossier.id);
          }});
      },
      error => {
        console.log(error);
      }
    );
  }

  editItem(item:any){
    this.selectedItem = item;
    this.clickButton('openEdit');
    this.form.patchValue({
      service: item.service,
      type: item.type,
      action: item.action,
      observation: item.observation,
      id:item.id,
    });
  }

  deleteEtape(id:any){
    if(confirm('Etes vous sur de vouloir supprimer cet Etape?')){
      this.subscriptions.push(

        this.etapeService.delete(id).subscribe(
          (response) => {
            console.log(response);
            Swal.fire('Thank you...', 'You submitted succesfully!', 'success').then((res)=>{
              if(res.isConfirmed){
                this.getDossier(this.currentDossier.id);
              }});

          },
          (error: HttpErrorResponse) => {
            console.log(error.error.message);
            Swal.fire('Ooops...', 'Internal error occured while deleting this step ', 'error');

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
