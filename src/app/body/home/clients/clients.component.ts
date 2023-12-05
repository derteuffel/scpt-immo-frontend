import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { Contrat } from 'src/app/models/contrat';

import { ContratService } from 'src/app/services/contrat.service';
import { TokenService } from 'src/app/services/token.service';


@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit,OnDestroy {
  lists: Contrat[]=[];
  anciens: Contrat[]=[];
  actifs: Contrat[]=[];
  selectedItem: any ={};
  p:number=1;
  term: string='';
  subscriptions?: Subscription;

  constructor(private contratService:ContratService, private tokenService: TokenService) { }
  ngOnDestroy(): void {
    this.subscriptions?.unsubscribe();
  }

  ngOnInit(): void {
    this.subscriptions = interval(300000).subscribe((func =>{
      this.tokenService.checkConnected();
    }))
  this.getAll();
  }

  getAll(){
    this.tokenService.checkConnected();
    this.contratService.findAll().subscribe(
      data =>{
        this.lists = data;
        console.log(data);
      },
      error =>{
        console.log(error);
      }
    );

   
    this.contratService.findAllByStatus(false).subscribe(
      data =>{
        this.anciens = data;
        console.log(data);
      },
      error =>{
        console.log(error);
      }
    );

    this.contratService.findAllByStatus(true).subscribe(
      data =>{
        this.actifs = data;
        console.log(data);
      },
      error =>{
        console.log(error);
      }
    );
  }

  
  getClientActifs(){
    this.tokenService.checkConnected();
    this.contratService.findAllByStatus(true).subscribe(
      data =>{
        this.lists = data;
        console.log(data);
      },
      error =>{
        console.log(error);
      }
    );
  }

  getAncienClients(){
    this.tokenService.checkConnected();
    this.contratService.findAllByStatus(false).subscribe(
      data =>{
        this.lists = data;
        console.log(data);
      },
      error =>{
        console.log(error);
      }
    );
  }


  detailItem(item:any){
    this.tokenService.checkConnected();
    this.selectedItem = item;
    this.clickButton('openDetail');
  }

   clickButton(buttonId: string): void {
    document.getElementById(buttonId)?.click();
  }

}
