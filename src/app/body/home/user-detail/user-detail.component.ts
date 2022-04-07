import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { ContratService } from 'src/app/services/contrat.service';
import { MensualiteService } from 'src/app/services/mensualite.service';
import { OccupationService } from 'src/app/services/occupation.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  
  currentUser: any={};
  roles: string[]=[];
  
  form: any ={};
  selectedItem: any ={};
  message?:string;
  p:number=1;
  private subscriptions: Subscription[] = [];

  constructor(private authService:AuthService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.roles = ['ROOT','DG','DSI','SECRETARIAT_PROVINCIAL','COMMMERCIAL','PROVINCIAL','PAYMENT'];
    
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
  }

  onSubmit(){
    
    this.authService.updateRole(this.currentUser.id, this.form.get('role').value).subscribe(
      (data : any) => {
        this.currentUser = data;
        this.clickButton('edit-role-close');
        console.log(data);
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
