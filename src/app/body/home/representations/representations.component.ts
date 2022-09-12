import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { constant } from 'src/app/constant';
import { LocaleService } from 'src/app/services/locale.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-representations',
  templateUrl: './representations.component.html',
  styleUrls: ['./representations.component.css']
})
export class RepresentationsComponent implements OnInit {

  lists: any[]=[];
  p:number = 1;
  provinces: string[]=[];
  villes: string[]=[];
  form: any ={};
  occupes: any[]=[];
  libres: any[]=[];
  term: string='';
  selectedItem: any ={};
  message:any;
  uploadedFile?: File;
  imgURL: any;
  searchForm: any;
  private subscriptions: Subscription[] = [];

  constructor(
    private localeService: LocaleService) { }

  ngOnInit(): void {
    this.loadList();
    this.provinces = constant.PROVINCES;

    this.villes=constant.VILLES;  
    this.init();
  }

  init(){
    this.form = new FormGroup({
      province: new FormControl(''),
      ville: new FormControl(''),
      commune: new FormControl(''),
      avenue: new FormControl(''),
      adresse: new FormControl(''),
      designation: new FormControl(''),
      denomination: new FormControl(''),
      reference: new FormControl(''),
      observation: new FormControl(''),
      miseEnService: new FormControl(''),
      montant: new FormControl(null),
      superficie: new FormControl(null),
      taux: new FormControl(null)
    });

    this.searchForm = new FormGroup({
      value: new FormControl('')
    });
  }

  loadList(){
    this.localeService.findAll().subscribe(
      data =>{
        this.lists = data;
        console.log(data);
      },
      error =>{
        console.log(error);
      }
    );
  }

  onSubmit(){
    const formData = {
      province: this.form.get('province').value,
      ville: this.form.get('ville').value,
      commune: this.form.get('commune').value,
      avenue: this.form.get('avenue').value,
      adresse: this.form.get('adresse').value,
      designation: this.form.get('designation').value,
      denomination: this.form.get('denomination').value,
      reference: this.form.get('reference').value,
      observation: this.form.get('observation').value,
      miseEnService: this.form.get('miseEnService').value,
      montant: this.form.get('montant').value,
      superficie: this.form.get('superficie').value,
      taux: this.form.get('taux').value,
    };

    console.log(formData);
    this.localeService.save(formData).subscribe(
      data => {
        this.clickButton('new-representation-close');
        Swal.fire('Thank you...', 'You submitted succesfully!', 'success')
        .then((result)=>{
          if(result.isConfirmed){
            this.loadList();
            this.init();
            
          }
        })
       

      },
      error =>{
        console.log(error);
        Swal.fire('Ooops...', 'Internal error occured while saving your representation!', 'error')
        
      }
    );
  }


  onFilesSelect(event:any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      
      this.uploadedFile = file;
      this.imgURL = file.name;
    }
  }

  validateFile(name: String) {
    var ext = name.substring(name.lastIndexOf('.') + 1);
    if (ext.toLowerCase() == 'xlsx'||ext.toLowerCase() == 'xls') {
        return true;
    }
    else {
        return false;
    }
}

  editItem(item:any){
    this.selectedItem = item;
    this.clickButton('openEdit');
    this.form.patchValue({
      province: item.province,
      ville: item.ville,
      commune: item.commune,
      avenue: item.avenue,
      adresse: item.adresse,
      designation: item.designation,
      denomination: item.denomination,
      reference: item.reference,
      observation: item.observateur,
      miseEnService: item.miseEnService,
      montant: item.montant,
      superficie: item.superficie,
      taux: item.taux
    });
  }

  onSubmitFile(){
    const formData = new FormData();
    
    if(this.uploadedFile==null || this.uploadedFile == undefined){
      console.log('error upload file');
      Swal.fire('Ooops...', 'Upload file please', 'warning')
        
    }else{
      if(!this.validateFile(this.uploadedFile.name)){
        this.message = 'File should be excel, please load correct file';
        Swal.fire('Ooops...', 'File should be excel, please load correct file', 'warning')
        
      }else{
        formData.append('file',this.uploadedFile);
    this.localeService.upload(formData).subscribe(
      data => {
        this.clickButton("new-file-close");
        Swal.fire('Thank you...', 'You submitted succesfully!', 'success')
        .then((result)=>{
          if(result.isConfirmed){
            this.loadList();
            
          }
        })
        
      },
      error => {
        console.log(error);
      }
    );
 }
  }
  }

  onEditSubmit(id:any){
    const formData = {
      province: this.form.get('province').value,
      ville: this.form.get('ville').value,
      commune: this.form.get('commune').value,
      avenue: this.form.get('avenue').value,
      adresse: this.form.get('adresse').value,
      designation: this.form.get('designation').value,
      denomination: this.form.get('denomination').value,
      reference: this.form.get('reference').value,
      observation: this.form.get('observation').value,
      miseEnService: this.form.get('miseEnService').value,
      montant: this.form.get('montant').value,
      superficie: this.form.get('superficie').value,
      taux: this.form.get('taux').value
    };

    console.log(formData);

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
        this.localeService.update(formData, id).subscribe(
          data => {
            console.log(data);
            Swal.fire('Thank you...', 'You submitted succesfully!', 'success').then((res)=>{
              if(res.isConfirmed){
                this.loadList();
                this.init();
                this.clickButton('edit-representation-close');
              }
            })
         
          },
          error =>{
            console.log(error);
            Swal.fire('Error', 'You submitted with error!', 'error');
          }
        );
      }
    })
    
  }

  onSubmitSearch(){
    this.localeService.findAllByVille(this.searchForm.get('value').value).subscribe(
      data =>{
        this.lists = data;
        console.log(data);
      },
      error =>{
        console.log(error);
      }
    );
  }

  deleteItem(id:any){
    if(confirm('Etes vous sure de vouloir suprimer ce locale?')){
    this.subscriptions.push(
      this.localeService.delete(id).subscribe(
        (response) => {
         console.log(response);
        },
        (error: HttpErrorResponse) => {
          console.log(error.error.message);
        }
      )
    );
  }
  }


  private clickButton(buttonId: string): void {
    document.getElementById(buttonId)?.click();
  }

  alertWithSuccess(){
    Swal.fire('Thank you...', 'You submitted succesfully!', 'success')
  }

}