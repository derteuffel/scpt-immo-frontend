import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { constant } from 'src/app/constant';
import { User } from 'src/app/models/user';
import { ContratService } from 'src/app/services/contrat.service';
import { MensualiteService } from 'src/app/services/mensualite.service';
import { OccupationService } from 'src/app/services/occupation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  
  currentUser: User = new User();
  roles: string[]=[];
  
  form: any ={};
  passwordForm: any = {};
  selectedItem: any ={};
  message?:string;
  p:number=1;
  private subscriptions: Subscription[] = [];

  constructor(private authService:AuthService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.roles = constant.ROLES;
    
  this.getUser(this.activatedRoute.snapshot.paramMap.get('id'));
  this.init();
  }

  getUser(id:any){
    this.authService.findOne(id).subscribe(
      data =>{
        this.currentUser = data;
       
        console.log(data);
      },
      error =>{
        console.log(error);
      }
    );
  }

 

  init(){
    this.form = new FormGroup({
      role: new FormControl(''),
      
    });
    this.passwordForm = new FormGroup({
      password: new FormControl('')
    })
  }

  onSubmit(){
    
    this.authService.updateRole(this.currentUser.id, this.form.get('role').value).subscribe(
      (data : any) => {
        this.clickButton('edit-role-close');
        console.log(data);
        Swal.fire('Thank you...', 'You updated role succesfully!', 'success')
        .then((result)=>{
          if(result.isConfirmed){
            this.currentUser = data;
          }
        })
        
      },
      (error:any) =>{
        console.log(error);
      }
    );  
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

  lockAction(id:any){
    if(this.currentUser.enabled){
        Swal.fire({title:'Desactivation', html:'Voulez-vous vraiment desactiver cet utilisateur ?', icon:'question', showCancelButton:true})
            .then((result)=>{
              if(result.isConfirmed){
                this.authService.lockAction(id).subscribe(
                  (data : any) => {
                    Swal.fire('Thank you...', 'You lock this user succesfully!', 'success')
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
            }); 
        
    }else{
      Swal.fire({title:'Activation', html:'Voulez-vous vraiment activer cet utilisateur ?', icon:'question', showCancelButton:true})
            .then((result)=>{
              if(result.isConfirmed){
                this.authService.lockAction(id).subscribe(
                  (data : any) => {
                    Swal.fire('Thank you...', 'You unlock this user succesfully!', 'success')
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
            }); 
    }
    
    
  }

  

  detailItem(item:any){
    this.selectedItem = item;
    this.clickButton('openDetail');
  }


   clickButton(buttonId: string): void {
    document.getElementById(buttonId)?.click();
  }

}