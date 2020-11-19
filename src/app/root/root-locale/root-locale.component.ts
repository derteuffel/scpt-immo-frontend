import { Component, OnInit } from '@angular/core';
import {RootLocaleService} from '../root-locale-service';

@Component({
  selector: 'app-root-locale',
  templateUrl: './root-locale.component.html',
  styleUrls: ['./root-locale.component.css']
})
export class RootLocaleComponent implements OnInit {

  lists: any = {};
  p: number = 1;
  searchItem: string;

  constructor(private rootLocaleService: RootLocaleService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void{
    this.rootLocaleService.getAll().subscribe(
      data => {
        this.lists = data;
        console.log(data);
      }
    );
  }

  deleteLocale(id): void{
    this.rootLocaleService.deleteLocale(id).subscribe(
      data => {
        console.log('delete successfuly');
      },
      error => {
        console.log(error);
      }
    );
  }

}
