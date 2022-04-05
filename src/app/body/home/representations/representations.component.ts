import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { constant } from 'src/app/constant';
import { LocaleService } from 'src/app/services/locale.service';

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
      spoiliateur: new FormControl(''),
      occupant: new FormControl(''),
      observation: new FormControl(''),
      affectation: new FormControl(''),
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
      spoiliateur: this.form.get('spoiliateur').value,
      occupant: this.form.get('occupant').value,
      observation: this.form.get('observation').value,
      affectation: this.form.get('affectation').value,
      miseEnService: this.form.get('miseEnService').value,
      montant: this.form.get('montant').value,
      superficie: this.form.get('superficie').value,
      taux: this.form.get('taux').value,
    };

    console.log(formData);
    this.localeService.save(formData).subscribe(
      data => {
        console.log(data);
        this.loadList();
        this.init();
        this.clickButton('new-representation-close');
      },
      error =>{
        console.log(error);
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
      spoiliateur: item.spoiliateur,
      occupant: item.occupant,
      observation: item.observateur,
      affectation: item.affectation,
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
    }else{
      if(!this.validateFile(this.uploadedFile.name)){
        this.message = 'File should be excel, please load correct file';
      }else{
        formData.append('file',this.uploadedFile);
    this.localeService.upload(formData).subscribe(
      data => {

        this.loadList();
        this.clickButton("new-file-close");
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
      spoiliateur: this.form.get('spoiliateur').value,
      occupant: this.form.get('occupant').value,
      observation: this.form.get('observation').value,
      affectation: this.form.get('affectation').value,
      miseEnService: this.form.get('miseEnService').value,
      montant: this.form.get('montant').value,
      superficie: this.form.get('superficie').value,
      taux: this.form.get('taux').value
    };

    console.log(formData);
    this.localeService.update(formData, id).subscribe(
      data => {
        console.log(data);
        this.loadList();
        this.init();
        this.clickButton('edit-representation-close');
      },
      error =>{
        console.log(error);
      }
    );
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

}
