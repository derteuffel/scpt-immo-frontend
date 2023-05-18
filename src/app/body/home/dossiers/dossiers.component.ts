import { Component, OnInit } from '@angular/core';
import {DossierService} from "../../../services/dossier/dossier.service";

@Component({
  selector: 'app-dossiers',
  templateUrl: './dossiers.component.html',
  styleUrls: ['./dossiers.component.css']
})
export class DossiersComponent implements OnInit {

  lists: any[]=[];
  listsCompletes: number=0;
  listsUnCompletes: number=0;
  listsLoading: number=0;
  alls: number=0;
  p: number = 1
  constructor(private dossierService: DossierService) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(){
    this.dossierService.findAll().subscribe(
      data =>{
        this.lists = data;
        if(data != null){
          this.alls = data.length;
        }
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );

    this.dossierService.findAllByStatus("ACCORDER").subscribe(
      data =>{
        if(data != null){
          this.listsCompletes = data.length;
        }
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );

    this.dossierService.findAllByStatus("REJETER").subscribe(
      data =>{
        if(data != null){
          this.listsUnCompletes = data.length;
        }
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );

    this.dossierService.findAllByStatus("ENCOURS").subscribe(
      data =>{
        if(data != null){
          this.listsLoading = data.length;
        }
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

  findAllByComplete(){
    this.dossierService.findAllByStatus("ACCORDER").subscribe(
      data =>{
        this.lists = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }
  findAllUnComplete(){
    this.dossierService.findAllByStatus("REJETER").subscribe(
      data =>{
        this.lists = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }
  findAllLoading(){
    this.dossierService.findAllByStatus("ENCOURS").subscribe(
      data =>{
        this.lists = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

}