import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LocaleService} from '../../../_services/locale.service';
import {Locale} from '../../../model/locale';
import {Representation} from '../../../model/representation';

@Component({
  selector: 'app-detail-local',
  templateUrl: './detail-local.component.html',
  styleUrls: ['./detail-local.component.css']
})
export class DetailLocalComponent implements OnInit {

  id: number;
  local: Locale;

  constructor(
                private route: ActivatedRoute,
                private router: Router,
                private localService: LocaleService
  ) { }

  ngOnInit(): void {
    this.local = new Locale();
    this.id = this.route.snapshot.params['id'];
    this.localService.getLocalId(this.id)
      .subscribe(data => {
        console.log(data);
        this.local = data;
      }, error => console.log(error));
  }

  list(){
    this.router.navigate(['local']);
  }

}
