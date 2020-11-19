import { Component, OnInit } from '@angular/core';
import {RootContratService} from '../root-contrat-service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-root-contrat-update',
  templateUrl: './root-contrat-update.component.html',
  styleUrls: ['./root-contrat-update.component.css']
})
export class RootContratUpdateComponent implements OnInit {

  currentContrat = null;

  constructor(private rootContratService: RootContratService, private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.getContrat(this.activatedRoute.snapshot.paramMap.get('id'));
  }

  getContrat(id): void{
    this.rootContratService.get(id).subscribe(
      data => {
        this.currentContrat = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

  updateContrat(): void{
    this.rootContratService.updateContrat(this.currentContrat, this.currentContrat.id).subscribe(
      data => {
        console.log(data);
        this.router.navigateByUrl('/root-contrat-detail/' + this.currentContrat.id);
      },
      error => {
        console.log(error);
      }
    );
  }

}
