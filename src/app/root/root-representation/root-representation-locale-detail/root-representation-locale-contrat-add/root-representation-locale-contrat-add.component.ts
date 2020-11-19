import { Component, OnInit } from '@angular/core';
import {RootLocaleService} from '../../../root-locale-service';
import {RootClientService} from '../../../root-client-service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-root-representation-locale-contrat-add',
  templateUrl: './root-representation-locale-contrat-add.component.html',
  styleUrls: ['./root-representation-locale-contrat-add.component.css']
})
export class RootRepresentationLocaleContratAddComponent implements OnInit {

  form: any = {};
  currentLocale = null;

  constructor(private rootLocaleService: RootLocaleService, private rootClientService: RootClientService,
              private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    this.getLocale(this.activatedRoute.snapshot.paramMap.get('id'));
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

  onSubmit(): void {
    this.rootClientService.createClient(this.form, this.currentLocale.id).subscribe(
      data => {
        console.log(data);
        this.router.navigateByUrl('/root-representation-locale-detail/' + this.currentLocale.id);
      },
      error => {
        console.log(error);
      }
    );
  }

}
