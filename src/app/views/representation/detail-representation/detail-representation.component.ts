import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,  Router} from '@angular/router';
import {RepresentationService} from '../../../_services/representation.service';
import {Representation} from '../../../model/representation';

@Component({
  selector: 'app-detail-representation',
  templateUrl: './detail-representation.component.html',
  styleUrls: ['./detail-representation.component.css']
})
export class DetailRepresentationComponent implements OnInit {
  id: number;
  rep: Representation;

  constructor(
              private route: ActivatedRoute,
              private router: Router,
              private repService: RepresentationService
  ) { }

  ngOnInit(): void {
    this.rep = new Representation();
    this.id = this.route.snapshot.params['id'];
    this.repService.getRepresentation(this.id)
      .subscribe(data => {
        console.log(data);
        this.rep = data;
      }, error => console.log(error));
  }

  list(){
    this.router.navigate(['list-representation']);
  }

}
