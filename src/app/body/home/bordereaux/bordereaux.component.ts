import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { MensualiteService } from 'src/app/services/mensualite.service';
import Swal from 'sweetalert2';
import {months} from "../../../constant";
import {TokenService} from "../../../services/token.service";
import {BordereausService} from "../../../services/bordereaus.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-bordereaux',
  templateUrl: './bordereaux.component.html',
  styleUrls: ['./bordereaux.component.css'],
  providers: [DatePipe]
})
export class BordereauxComponent implements OnInit {

  lists: any[]=[];
  mois:any;
  montantPayer:any;
  montantImpayer:any;
  message:any;
  successMessage:any;
  searchForm: any ={};
  isRepportProduce: boolean = false;
  navigationParams: any={};
  form: any ={};
  months: string[]=[];
  years: string[]=[];
  selectedItem: any ={};
  p:number=1;
  term: string='';


  constructor(private bordereauxService: BordereausService,private datePipe:DatePipe,
              private activatedRoute: ActivatedRoute, private tokenService: TokenService) { }

  ngOnInit(): void {
  this.months = months;
  this.years = this.tokenService.getYearList();
  this.getBordereaux();
    this.init();

  }


  init(){
    this.searchForm = new UntypedFormGroup({
      mois: new UntypedFormControl(""),
      year: new UntypedFormControl(""),
      value: new UntypedFormControl(false)
    });

  }


  onSubmitSearch(){
    const searchValue = {mois:this.searchForm.get('mois').value,year:this.searchForm.get('year').value,status:this.searchForm.get('value').value}
    if (searchValue.mois != null && searchValue.mois != ""){
      this.bordereauxService.findAllByStatusAndMoisAndYear(searchValue.status,searchValue.mois,searchValue.year).subscribe(
        data =>{
          this.lists = data;
          console.log(data);
        },
        error => {
          console.log(error);
        }
      );
    }else {
      this.bordereauxService.findAllByStatusAndAnnee(searchValue.status, searchValue.year).subscribe(
        data =>{
          this.lists = data;
          console.log(data);
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  getBordereaux(){
    let date = this.datePipe.transform(new Date(),"yyyy");

    this.bordereauxService.findAllByStatusAndAnnee(false,date).subscribe(
      data =>{
        this.lists = data;
        console.log(data);
      },
      error =>{
        console.log(error);
      }
    );
  }




  clickButton(buttonId: string): void {
    document.getElementById(buttonId)?.click();
  }

}
