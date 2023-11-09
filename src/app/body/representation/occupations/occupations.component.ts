import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { LocaleService } from 'src/app/services/locale.service';
import { MensualiteService } from 'src/app/services/mensualite.service';
import { OccupationService } from 'src/app/services/occupation.service';
import Swal from 'sweetalert2';

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

  selectedFiles!: FileList;
  fileInfos!: Observable<any>;

  constructor(private occupationService:OccupationService, private activatedRoute: ActivatedRoute,
    private localeService: LocaleService, private mensualiteService: MensualiteService) { }

  ngOnInit(): void {
  this.getlocale(this.activatedRoute.snapshot.paramMap.get('id'));
  this.init();
  }


selectFiles(event:any) {
  this.selectedFiles = event.target.files;
}

uploadFiles(){
  for (let i = 0; i < this.selectedFiles.length; i++) {
    console.log(this.selectedFiles[i].name)
  
    this.localeService.uploadFiles(this.selectedFiles[i],this.currentLocale.id).subscribe(
      data =>{
        console.log(data);
      },
      error =>{
        Swal.fire('Ooops...', 'Internal error occured while saving local '+error, 'error');
      }
    );
  }
}

removeFile(file:any){
  Swal.fire('Alert.', 'Etes-vous sur de vouloir supprimer cette image?', 'warning').then((res)=>{
              if(res.isConfirmed){
                this.localeService.removeFile(file, this.currentLocale.id).subscribe(
                  data =>{
                    Swal.fire('Thank you...', 'You submitted succesfully!', 'success').then((res)=>{
                        if(res.isConfirmed){
                        this.getlocale(this.currentLocale.id);
                        
                        this.init();
                      }
                    })
                  },
                  error =>{
                    Swal.fire('Ooops...', 'Internal error occured while saving local ', 'error');
                  }
                )
                 
                 }
            })
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
    this.form = new UntypedFormGroup({
      numeroOccupation: new UntypedFormControl(''),
      supperficieOccupation: new UntypedFormControl(''),
      montantOccupation: new UntypedFormControl('')
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
              this.clickButton('new-occupation-close');
              Swal.fire('Thank you...', 'You submitted succesfully!', 'success').then((res)=>{
              if(res.isConfirmed){
              this.getlocale(this.currentLocale.id);
              
              this.init();
            }
          })
            },
            error =>{
              console.log(error);
              Swal.fire('Ooops...', 'Internal error occured while saving local ', 'error');

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
    this.occupationService.update(formData, id).subscribe(
      data => {
        console.log(data);
        this.clickButton('edit-occupation-close');
        Swal.fire('Thank you...', 'You submitted succesfully!', 'success').then((res)=>{
          if(res.isConfirmed){
        this.getlocale(this.currentLocale.id);
          }});
      },
      error =>{
        console.log(error);
        Swal.fire('Ooops...', 'Internal error occured while editing local ', 'error');

      }
    );
      }
    });
  }

  deleteItem(id:any){
    if(confirm('Etes vous sur de vouloir supprimer ce local?')){
    this.subscriptions.push(

      this.occupationService.delete(id).subscribe(
        (response) => {
         console.log(response);
        
         Swal.fire('Thank you...', 'You have deleted this local succesfully!', 'success')
                    .then((result)=>{
                      if(result.isConfirmed){
                        this.getlocale(this.currentLocale.id);                      }
                    });
        },
        (error: HttpErrorResponse) => {
          console.log(error.error.message);
          Swal.fire('Ooops...', 'Internal error occured while deleting!', 'error');
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
