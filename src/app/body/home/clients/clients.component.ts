import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Contrat } from 'src/app/models/contrat';

import { ContratService } from 'src/app/services/contrat.service';


@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  lists: Contrat[]=[];
  anciens: Contrat[]=[];
  actifs: Contrat[]=[];
  selectedItem: any ={};
  p:number=1;
  term: string='';
  private subscriptions: Subscription[] = [];

  constructor(private contratService:ContratService) { }

  ngOnInit(): void {
  this.getAll();
  }

  getAll(){
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
    this.selectedItem = item;
    this.clickButton('openDetail');
  }

   clickButton(buttonId: string): void {
    document.getElementById(buttonId)?.click();
  }

}
