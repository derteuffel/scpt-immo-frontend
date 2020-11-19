import { Component, OnInit } from '@angular/core';
import {Representation} from '../../model/representation';
import {RootRepresentationService} from '../root-representation-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root-representation-add',
  templateUrl: './root-representation-add.component.html',
  styleUrls: ['./root-representation-add.component.css']
})
export class RootRepresentationAddComponent implements OnInit {

  form: any = {};

  constructor(private rootRepresentationService: RootRepresentationService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(){

    this.rootRepresentationService.create(this.form).subscribe(
      data => {
        console.log(data);
        this.router.navigateByUrl('/root-home');
      },
      error => {
        console.log(error);
      }
    );
  }



}
