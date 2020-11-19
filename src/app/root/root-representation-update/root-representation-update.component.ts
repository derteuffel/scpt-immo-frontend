import { Component, OnInit } from '@angular/core';
import {RootRepresentationService} from '../root-representation-service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-root-representation-update',
  templateUrl: './root-representation-update.component.html',
  styleUrls: ['./root-representation-update.component.css']
})
export class RootRepresentationUpdateComponent implements OnInit {
  currentRepresentation = null;

  constructor(private rootRepresentationService: RootRepresentationService,
              private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getRepresentation(this.activatedRoute.snapshot.paramMap.get('id'));
  }


  getRepresentation(id): void {
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

  updateRepresentation(): void {
    this.rootRepresentationService.update(this.currentRepresentation.id, this.currentRepresentation).subscribe(
      data => {
        console.log(data);
        this.router.navigateByUrl('/root-representation/' + this.currentRepresentation.id);
      },
      error => {
        console.log(error);
      }
    );
  }

}
