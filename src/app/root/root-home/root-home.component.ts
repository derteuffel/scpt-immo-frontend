import { Component, OnInit } from '@angular/core';
import {RootRepresentationService} from '../root-representation-service';

@Component({
  selector: 'app-root-home',
  templateUrl: './root-home.component.html',
  styleUrls: ['./root-home.component.css']
})
export class RootHomeComponent implements OnInit {

  lists: any;

  p: number = 1;
  searchItem: string;

  constructor(private rootRepresentationService: RootRepresentationService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void{
    this.rootRepresentationService.getAll().subscribe(
      data => {
          this.lists = data;
          console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteRepresentation(id): void {
    this.rootRepresentationService.delete(id).subscribe(
      data => {
        console.log('Element deleted sucessfully');
        window.location.reload();
      },
      error => {
        console.log(error);
      }
    );
  }

}
