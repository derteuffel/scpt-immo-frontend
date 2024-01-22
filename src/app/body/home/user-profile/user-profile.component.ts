import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription, interval } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { constant } from 'src/app/constant';
import { User } from 'src/app/models/user';
import { TokenService } from 'src/app/services/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  currentUser: User = new User();
  roles: string[]=[];

  form: any ={};
  passwordForm: any = {};
  selectedItem: any ={};
  message?:string;
  p:number=1;
  subscription?: Subscription;

  constructor(private authService:AuthService, private activatedRoute: ActivatedRoute, private tokenService:TokenService) { }


  ngOnInit(): void {
    this.roles = constant.ROLES;

  this.getUser(this.activatedRoute.snapshot.paramMap.get('username'));
  this.init();
  }

  getUser(username:any){
    this.authService.findOne(username).subscribe(
      data =>{
        this.currentUser = data;

        console.log(data);

        this.form.patchValue({
          role: data.role
        })
      },
      error =>{
        console.log(error);
      }
    );
  }



  init(){
    this.form = new UntypedFormGroup({
      role: new UntypedFormControl(''),

    });
    this.passwordForm = new UntypedFormGroup({
      password: new UntypedFormControl('')
    })
  }

  isDSI():boolean{
   let user = this.authService.currentUserValue;
   if(user.role.toString() === 'DSI' || user.role.toString() === 'ROOT'){
    return true;
   }else{
    return false;
   }
  }


  onSubmitPassword(id:any){
    console.log(this.passwordForm.get('password').value);
    this.authService.updatePassword(this.passwordForm.get('password').value, id).subscribe(
      (data : any) => {
        console.log(data);
        this.clickButton('edit-password-close');
        this.init();
        Swal.fire('Thank you...', 'You updated password succesfully!', 'success')
        .then((result)=>{
          if(result.isConfirmed){
            this.currentUser = data;
          }
        });
      },
      (error:any) =>{
        console.log(error);
      }
    );
  }




  detailItem(item:any){
    this.selectedItem = item;
    this.clickButton('openDetail');
  }


   clickButton(buttonId: string): void {
    document.getElementById(buttonId)?.click();
  }

}
