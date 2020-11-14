import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {LocaleService} from '../../../_services/locale.service';
import {Locale} from '../../../model/locale';
import {Representation} from '../../../model/representation';

@Component({
  selector: 'app-enregistrement-local',
  templateUrl: './enregistrement-local.component.html',
  styleUrls: ['./enregistrement-local.component.css']
})
export class EnregistrementLocalComponent implements OnInit {

  submitted = false;
  local: Locale = new Locale();
  id: number;
  constructor(private router: Router, private localService: LocaleService) { }

  ngOnInit(): void {
  }

  newLocal() {
    this.submitted = false;
    this.local = new Locale();
  }

  save() {
    this.localService.createLocale(this.local, this.id).subscribe( data => {
      console.log(data);
      this.local = new Locale();
      this.goToList();
    }, error => console.log(error));
  }

  goToList(){
    this.router.navigate(['/local']);
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }

}
