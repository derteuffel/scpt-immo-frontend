import { Component, OnInit } from '@angular/core';
import {RootRepresentationService} from '../root-representation-service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-root-representation-update',
  templateUrl: './root-representation-update.component.html',
  styleUrls: ['./root-representation-update.component.css']
})
export class RootRepresentationUpdateComponent implements OnInit {
  currentRepresentation = null;

  constructor(private rootRepresentationService: RootRepresentationService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }

}
