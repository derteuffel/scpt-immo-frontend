import { Component, OnInit } from '@angular/core';
import {RootContratService} from '../../../root-contrat-service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-root-representation-locale-contrat-update',
  templateUrl: './root-representation-locale-contrat-update.component.html',
  styleUrls: ['./root-representation-locale-contrat-update.component.css']
})
export class RootRepresentationLocaleContratUpdateComponent implements OnInit {

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
        this.router.navigateByUrl('/root-representation-locale-contrat-detail/' + this.currentContrat.id);
      },
      error => {
        console.log(error);
      }
    );
  }

}
