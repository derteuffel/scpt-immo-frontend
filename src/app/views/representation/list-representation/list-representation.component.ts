import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {RepresentationService} from '../../../_services/representation.service';
import {Observable} from 'rxjs';
import {Representation} from '../../../model/representation';

@Component({
  selector: 'app-list-representation',
  templateUrl: './list-representation.component.html',
  styleUrls: ['./list-representation.component.css']
})
export class ListRepresentationComponent implements OnInit {

  representations: Observable<Representation[]>;

  constructor(private router: Router, private repService: RepresentationService) { }

  ngOnInit(): void {

    this.reloadData();
  }

  reloadData() {
    this.representations = this.repService.listRepresentation();
  }

  deleteRep(id: number) {
    this.repService.deleteRepresentation(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

  repDetail(id: number) {
    this.router.navigate(['detail', id]);
  }

  repUpdate(id: number) {
    this.router.navigate(['update', id]);
  }

}
