import { Component, OnInit } from '@angular/core';
import {RepresentationService} from '../../../_services/representation.service';
import {RootRepresentationService} from '../../root-representation-service';
import {RootLocaleService} from '../../root-locale-service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-root-representation-locale-add',
  templateUrl: './root-representation-locale-add.component.html',
  styleUrls: ['./root-representation-locale-add.component.css']
})
export class RootRepresentationLocaleAddComponent implements OnInit {

  currentRepresentation = null;
  form: any = {};
  message: string;

  constructor(private  rootRepresentationService: RootRepresentationService, private rootLocaleService: RootLocaleService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getRepresentation(this.activatedRoute.snapshot.paramMap.get('id'));
  }

  getRepresentation(id): void{
    this.rootRepresentationService.get(id).subscribe(
      data => {
        this.currentRepresentation = data;
        console.log( data);
      },
      error => {
        console.log(error);
      }
    );
  }

  onSubmit(): void{

    this.rootLocaleService.createLocale(this.form, this.currentRepresentation.id).subscribe(
      data => {
        console.log(data);
        window.location.reload();
        this.message = 'Vous avez ajouter un nouveau local, Voulez vous ajouter un autre?';
      },
      error => {
        console.log(error);
      }
    );
  }

}
