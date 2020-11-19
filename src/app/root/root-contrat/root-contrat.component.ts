import { Component, OnInit } from '@angular/core';
import {RootContratService} from '../root-contrat-service';

@Component({
  selector: 'app-root-contrat',
  templateUrl: './root-contrat.component.html',
  styleUrls: ['./root-contrat.component.css']
})
export class RootContratComponent implements OnInit {

  lists: any = {};
  p: number = 1;
  searchItem: string;

  constructor(private rootContratService: RootContratService) { }

  ngOnInit(): void {
    this.getContrats();
  }


  getContrats(): void{
    this.rootContratService.getAll().subscribe(
      data => {
        this.lists = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

}
