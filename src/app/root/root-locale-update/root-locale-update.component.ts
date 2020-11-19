import { Component, OnInit } from '@angular/core';
import {RootLocaleService} from '../root-locale-service';
import {ActivatedRoute, Router} from '@angular/router';
import {RootRepresentationService} from '../root-representation-service';

@Component({
  selector: 'app-root-locale-update',
  templateUrl: './root-locale-update.component.html',
  styleUrls: ['./root-locale-update.component.css']
})
export class RootLocaleUpdateComponent implements OnInit {

  currentLocale = null;

  constructor(private rootLocaleService: RootLocaleService, private activatedRoute: ActivatedRoute,
              private router: Router, private rootRepresentationService: RootRepresentationService) { }

  ngOnInit(): void {

    this.getLocale(this.activatedRoute.snapshot.paramMap.get('id'));
  }

  getLocale(id): void {
    this.rootLocaleService.get(id).subscribe(
      data => {
        console.log(data);
        this.currentLocale = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  updateLocale(): void{
    this.rootLocaleService.updateLocale(this.currentLocale, this.currentLocale.id).subscribe(
      data => {
        console.log(data);
        this.router.navigateByUrl('/root-locale-detail/' + this.currentLocale.id);
      },
      error => {
        console.log(error);
      }
    );
  }

}
