import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { constant } from 'src/app/constant';
import { LocaleService } from 'src/app/services/locale.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  lists: any[]=[];
  p:number = 1;
  provinces: string[]=[];
  form: any ={};
  term: string='';
  selectedItem: any ={};
  message:any;
  uploadedFile?: File;
  imgURL: any;
  searchForm: any;
  private subscriptions: Subscription[] = [];

  constructor(
    private authService: AuthService) { }

  ngOnInit(): void {
    this.loadList();
    this.provinces = constant.PROVINCES;  
    this.init();
  }

  init(){
    this.form = new FormGroup({
      province: new FormControl(''),
      firstname: new FormControl(''),
      lastname: new FormControl(''),
      idNumber: new FormControl(''),
      matricule: new FormControl(''),
      fonction: new FormControl(''),
      email: new FormControl(''),
      telephone: new FormControl(''),
      
    });

    this.searchForm = new FormGroup({
      province: new FormControl('')
    });
  }

  loadList(){
    this.authService.findAll().subscribe(
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
      firstname: this.form.get('firstname').value,
      lastname: this.form.get('lastname').value,
      email: this.form.get('email').value,
      idNumber: this.form.get('idNumber').value,
      fonction: this.form.get('fonction').value,
      matricule: this.form.get('matricule').value,
      telephone: this.form.get('telephone').value,
      
    };

    console.log(formData);
    this.authService.save(formData).subscribe(
      data => {
        console.log(data);
        this.loadList();
        this.init();
        this.clickButton('new-user-close');
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
      firstname: item.firstname,
      lastname: item.lastname,
      email: item.email,
      idNumber: item.idNumber,
      fonction: item.fonction,
      matricule: item.matricule,
      telephone: item.telephone,
    });
  }

  

  onEditSubmit(id:any){
    const formData = {
      province: this.form.get('province').value,
      firstname: this.form.get('firstname').value,
      lastname: this.form.get('lastname').value,
      email: this.form.get('email').value,
      idNumber: this.form.get('idNumber').value,
      fonction: this.form.get('fonction').value,
      matricule: this.form.get('matricule').value,
      telephone: this.form.get('telephone').value,
    };

    console.log(formData);
    this.authService.update(id,formData ).subscribe(
      data => {
        console.log(data);
        this.loadList();
        this.init();
        this.clickButton('edit-user-close');
      },
      error =>{
        console.log(error);
      }
    );
  }

  onSubmitSearch(){
    this.authService.findAllByProvince(this.searchForm.get('province').value).subscribe(
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
    if(confirm('Etes vous sure de vouloir suprimer cet utilisateur?')){
    this.subscriptions.push(
      this.authService.delete(id).subscribe(
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
