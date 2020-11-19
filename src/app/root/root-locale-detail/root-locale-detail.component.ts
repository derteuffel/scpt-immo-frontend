import { Component, OnInit } from '@angular/core';
import {RootLocaleService} from '../root-locale-service';
import {ActivatedRoute} from '@angular/router';
import {RootContratService} from '../root-contrat-service';

@Component({
  selector: 'app-root-locale-detail',
  templateUrl: './root-locale-detail.component.html',
  styleUrls: ['./root-locale-detail.component.css']
})
export class RootLocaleDetailComponent implements OnInit {
  currentLocale = null;
  lists: any = {};

  constructor(private rootLocaleService: RootLocaleService, private activatedRoute: ActivatedRoute,
              private rootContratService: RootContratService) { }

  ngOnInit(): void {
    this.getLocale(this.activatedRoute.snapshot.paramMap.get('id'));
    this.getContratsByLocale(this.activatedRoute.snapshot.paramMap.get('id'));
  }

  getLocale(id): void{
    this.rootLocaleService.get(id).subscribe(
      data => {
        this.currentLocale = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

  getContratsByLocale(id): void{

    this.rootContratService.getAllByLocale(id).subscribe(
      data => {
        this.lists = data;
        console.log(this.lists);
      },
      error => {
        console.log(error);
      }
    );

  }

  deleteContrat(id): void{
    this.rootContratService.deleteContrat(id).subscribe(
      data => {
        console.log('vous avez supprimer avec succes ce contrat');
        window.location.reload();
      },
      error => {
        console.log(error);
      }
    );
  }

}
