import { Component, OnInit } from '@angular/core';
import {RootClientService} from '../root-client-service';

@Component({
  selector: 'app-root-client',
  templateUrl: './root-client.component.html',
  styleUrls: ['./root-client.component.css']
})
export class RootClientComponent implements OnInit {

  lists: any = {};
  p: number = 1;
  searchItem: string;

  constructor(private rootClientService: RootClientService) { }

  ngOnInit(): void {

    this.getAll();
  }

  getAll(): void{
    this.rootClientService.getAll().subscribe(
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
