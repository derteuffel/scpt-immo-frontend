import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { LocaleService } from 'src/app/services/locale.service';
import { MensualiteService } from 'src/app/services/mensualite.service';
import { OccupationService } from 'src/app/services/occupation.service';

@Component({
  selector: 'app-occupations',
  templateUrl: './occupations.component.html',
  styleUrls: ['./occupations.component.css']
})
export class OccupationsComponent implements OnInit {

  lists: any[]=[];
  alls:any[]=[];
  libres: any[]=[];
  occupes: any[]=[];
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

  constructor(private occupationService:OccupationService, private activatedRoute: ActivatedRoute,
    private localeService: LocaleService, private mensualiteService: MensualiteService) { }

  ngOnInit(): void {
  this.getlocale(this.activatedRoute.snapshot.paramMap.get('id'));
  this.init();
  }

  getlocale(id:any){
    this.localeService.findOne(id).subscribe(
      data =>{
        this.currentLocale = data;
        console.log(data);
        this.getOccupationByLocale();
      },
      error =>{
        console.log(error);
      }
    );

    this.occupationService.findAllByLocale(id).subscribe(
      data =>{
        this.alls = data;
        console.log(data);
      },
      error =>{
        console.log(error);
      }
    );

    this.occupationService.findAllByLocaleAndStatus(id,false).subscribe(
      data =>{
        this.libres = data;
        console.log(data);
      },
      error =>{
        console.log(error);
      }
    );

    this.occupationService.findAllByLocaleAndStatus(id,true).subscribe(
      data =>{
        this.occupes = data;
        console.log(data);
      },
      error =>{
        console.log(error);
      }
    );
  }

  getOccupationByLocale(){
    this.occupationService.findAllByLocale(this.currentLocale.id).subscribe(
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
      numeroOccupation: new FormControl(''),
      supperficieOccupation: new FormControl(''),
      montantOccupation: new FormControl('')
    });
  }

  onSubmit(){
    const formData = {
      numeroOccupation: this.form.get('numeroOccupation').value,
      supperficieOccupation: this.form.get('supperficieOccupation').value,
      montantOccupation: this.form.get('montantOccupation').value,
    }
  
   this.occupationService.save(formData, this.currentLocale.id).subscribe(
            data => {
              console.log(data);
              this.getlocale(this.currentLocale.id);
              this.clickButton('new-occupation-close');
              this.init();
            },
            error =>{
              console.log(error);
            }
          );
           
  }

  getOccupationOcuppe(){
    this.occupationService.findAllByLocaleAndStatus(this.currentLocale.id,true).subscribe(
      data =>{
        this.lists = data;
        console.log(data);
      },
      error =>{
        console.log(error);
      }
    );
  }

  getOccupationLibre(){
    this.occupationService.findAllByLocaleAndStatus(this.currentLocale.id,false).subscribe(
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
      numeroOccupation: item.numeroOccupation,
      supperficieOccupation: item.supperficieOccupation,
      montantOccupation: item.montantOccupation,
      
    });
  }



  onEditSubmit(id:any){
    const formData = {
      numeroOccupation: this.form.get('numeroOccupation').value,
      supperficieOccupation: this.form.get('supperficieOccupation').value,
      montantOccupation: this.form.get('montantOccupation').value,
    }
    this.occupationService.update(formData, id).subscribe(
      data => {
        console.log(data);
        this.getlocale(this.currentLocale.id);
        this.clickButton('edit-occupation-close');
      },
      error =>{
        console.log(error);
      }
    );
  }

  deleteItem(id:any){
    if(confirm('Etes vous sur de vouloir supprimer cette Occupation?')){
    this.subscriptions.push(

      this.occupationService.delete(id).subscribe(
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
