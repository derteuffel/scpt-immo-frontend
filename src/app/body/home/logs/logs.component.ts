import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { error } from 'console';
import { Subscription, interval } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import {constant, provinceData} from 'src/app/constant';
import { Role } from 'src/app/enums/role.enum';
import { LocaleService } from 'src/app/services/locale.service';
import { LogsService } from 'src/app/services/logs.service';
import { TokenService } from 'src/app/services/token.service';
import { XlxsService } from 'src/app/services/xlxs/xlxs.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {

  lists: any[]=[];
  json:any;
  title="";
  p:number = 1;
  users:any[]=[];
  id:any;
  date:any;
  selectedDate:any;
  
  term: string='';
  selectedItem: any ={};
  message:any;
  
  constructor(private logsService: LogsService, private authService: AuthService, private route: Router,
    private xlxsService: XlxsService, private datePipe: DatePipe, private activatedRoute: ActivatedRoute) {


     }


  ngOnInit(): void {
     this.activatedRoute.queryParams.subscribe(params => {
        if(params['userId']){
          this.id = params['userId'];
          this.onSearchByUser(params['userId']);
        }else if(params['date']){
          this.date = params['date'];
          this.onSearchByDate(params['date']);
        }else{
          this.loadList();
        }
      });
    
    this.loadUsers();
  }

  
  exportToExcel(){
    if(confirm('Voulez-vous generer le fichier excel?')){
      this.xlxsService.exportAsExcelFile(this.json, this.title);
    }
    
  }

  loadList(){
    this.logsService.findAll().subscribe(
      data =>{
        this.lists = data;
        this.json = data;

      },
      error =>{
        console.log(error);
         console.log(error);
        Swal.fire('Ooops', 'Une erreur est survenue lors du chargement des logs', 'error')
      }
    );
  }

  loadUsers(){
    this.authService.findAll().subscribe(
      data =>{
        this.users = data;
        console.log(data);
      },
      error =>{
         console.log(error);
        Swal.fire('Ooops', 'Une erreur est survenue lors du chargement des utilisateurs', 'error')
      }
    )
  }

  searchByUser(){

    const searchNavigationExtras: NavigationExtras = {
      queryParams:{
        'userId':this.id
      }
    }

    this.route.navigate(['/admin/logs'], searchNavigationExtras);
  }

  onSearchByUser(id:any){
    this.logsService.findAllByUser(id).subscribe(
      data => {
        this.lists = data;
        this.json = data;
        console.log(data);
      },
      error =>{
        console.log(error);
        Swal.fire('Ooops', 'Une erreur est survenue lors du chargement', 'error')
      }
    );
  }

  searchByDate(){

    this.date = this.datePipe.transform(this.selectedDate,"dd-MM-yyyy");
    const searchNavigationExtras: NavigationExtras = {
      queryParams:{
        'date':this.date
      }
    }

    this.route.navigate(['/admin/logs'], searchNavigationExtras);
  }

  onSearchByDate(date:any){
    this.selectedDate = null;
    this.logsService.findAllByDate(date).subscribe(
      data => {
        this.lists = data;
        this.json = data;
        console.log(data);
      },
      error =>{
        console.log(error);
        Swal.fire('Ooops', 'Une erreur est survenue lors du chargement', 'error')
      }
    );
  }



  private clickButton(buttonId: string): void {
    document.getElementById(buttonId)?.click();
  }

  alertWithSuccess(){
    Swal.fire('Thank you...', 'You submitted succesfully!', 'success')
  }

  

}
