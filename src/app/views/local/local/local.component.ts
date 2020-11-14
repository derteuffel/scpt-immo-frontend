import { Component, OnInit } from '@angular/core';
import {Locale} from '../../../model/locale';
import {Observable} from 'rxjs';
import {Representation} from '../../../model/representation';
import {Router} from '@angular/router';
import {LocaleService} from '../../../_services/locale.service';

@Component({
  selector: 'app-local',
  templateUrl: './local.component.html',
  styleUrls: ['./local.component.css']
})
export class LocalComponent implements OnInit {

  locales: Observable<Locale[]>;
  rep: Representation;
  id: number;

  constructor(private router: Router, private localService: LocaleService) { }

  ngOnInit(): void {
    this.reloadData();
  }

  reloadData() {
    this.locales = this.localService.getLocalByRepresentation(this.id);
  }

  deleteLocal(id: number) {
    this.localService.deleteLocal(id)
      .subscribe(data => {
        console.log(data);
        this.reloadData();
      },
          error => console.log(error));

  }

  localUpdate(id: number) {
    this.router.navigate(['detail', id]);
  }

  localDetail(id: number) {
    this.router.navigate(['update', id]);
  }
}
