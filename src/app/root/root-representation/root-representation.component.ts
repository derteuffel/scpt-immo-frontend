import { Component, OnInit } from '@angular/core';
import {RootRepresentationService} from '../root-representation-service';
import {ActivatedRoute, Router} from '@angular/router';
import {RootLocaleService} from '../root-locale-service';

@Component({
  selector: 'app-root-representation',
  templateUrl: './root-representation.component.html',
  styleUrls: ['./root-representation.component.css']
})
export class RootRepresentationComponent implements OnInit {

  currentRepresentation = null;
  lists: any;

  constructor(private rootRepresentationService: RootRepresentationService,
              private activatedRoute: ActivatedRoute, private router: Router, private rootLocaleService: RootLocaleService) { }

  ngOnInit(): void {
    this.getRepresentation(this.activatedRoute.snapshot.paramMap.get('id'));
    this.getRepresentationLocale(this.activatedRoute.snapshot.paramMap.get('id'));
  }

  getRepresentation(id): void
  {
    this.rootRepresentationService.get(id).subscribe(
      data => {
          this.currentRepresentation = data;
          console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }


  getRepresentationLocale(id): void{
    this.rootLocaleService.getAllByRepresentation(id).subscribe(
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
