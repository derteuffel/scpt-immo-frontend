import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, FormControlDirective, FormControl } from '@angular/forms';
import { Subscription, interval } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import {constant, provinceData} from 'src/app/constant';
import { LocaleService } from 'src/app/services/locale.service';
import { TokenService } from 'src/app/services/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  lists: any[]=[];
  p:number = 1;
  provinces: Array<any> = [];
  form: any ={};
  term: string='';
  selectedItem: any ={};
  message:any;
  uploadedFile?: File;
  imgURL: any;
  searchForm: any;
  roles:string[]=[];
  private subscriptions: Subscription[] = [];
  checkSub?:Subscription;

  constructor(
    private authService: AuthService, private tokenService:TokenService) { }


  ngOnInit(): void {
      this.tokenService.checkConnected();
    this.loadList();
    this.provinces = provinceData;
    this.roles = constant.ROLES;
    this.init();
  }

  init(){
    this.form = new UntypedFormGroup({
      province: new UntypedFormControl(''),
      firstname: new UntypedFormControl(''),
      lastname: new UntypedFormControl(''),
      idNumber: new UntypedFormControl(''),
      matricule: new UntypedFormControl(''),
      fonction: new UntypedFormControl(''),
      email: new UntypedFormControl(''),
      telephone: new UntypedFormControl(''),
      role: new FormControl('')

    });

    this.searchForm = new UntypedFormGroup({
      province: new UntypedFormControl('')
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
      role: this.form.get('role').value

    };

    console.log(formData);
    this.authService.save(formData).subscribe(
      data => {
        console.log(data);
        this.clickButton('new-user-close');
        Swal.fire('Thank you...', 'You have saved this user succesfully!', 'success')
                    .then((result)=>{
                      if(result.isConfirmed){
                        this.loadList();
                        this.init();
                      }
                    });
      },
      error =>{
        console.log(error);
        Swal.fire('Ooops...', 'Internal error occured while saving!', 'error');

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
        this.clickButton('edit-user-close');
        Swal.fire('Thank you...', 'You have updated this user succesfully!', 'success')
                    .then((result)=>{
                      if(result.isConfirmed){
                        this.loadList();
                        this.init();
                      }
                    });
      },
      error =>{
        console.log(error);
        Swal.fire('Ooops...', 'Internal error occured while saving!', 'error');
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
         Swal.fire('Thank you...', 'You have deleted this user succesfully!', 'success')
                    .then((result)=>{
                      if(result.isConfirmed){
                        this.loadList();
                      }
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


  private clickButton(buttonId: string): void {
    document.getElementById(buttonId)?.click();
  }
}
