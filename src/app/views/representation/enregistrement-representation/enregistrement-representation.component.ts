import {Component, Input, OnInit} from '@angular/core';
import {Representation} from '../../../model/representation';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {RepresentationService} from '../../../_services/representation.service';

@Component({
  selector: 'app-enregistrement-representation',
  templateUrl: './enregistrement-representation.component.html',
  styleUrls: ['./enregistrement-representation.component.css']
})
export class EnregistrementRepresentationComponent implements OnInit {


  @Input() rep: Representation;
  registerForm: FormGroup;
  save: boolean;
  delete: boolean;
  update: boolean;
  representation: Representation = new Representation();
  submitted = false;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private repService: RepresentationService
              ) { }

  ngOnInit(): void {
  }

  newRepresentation() {
    this.submitted = false;
    this.representation = new Representation();
  }

  enregistrer() {
    this.repService.createRepresentation(this.representation).subscribe(data => {
      console.log(data);
      this.representation = new Representation();
      this.goToList();
    },
      error => console.log(error));
  }

  goToList() {
    this.router.navigate(['/list-representation']);
  }
  onSubmit() {
    this.submitted = true;
    this.enregistrer();
  }


}
