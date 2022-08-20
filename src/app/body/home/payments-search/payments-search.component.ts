import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { MensualiteService } from 'src/app/services/mensualite.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payments-search',
  templateUrl: './payments-search.component.html',
  styleUrls: ['./payments-search.component.css']
})
export class PaymentsSearchComponent implements OnInit {

  mensualites: any[]=[];
  montantTotal:any;
  montantPayer:any;
  montantImpayer:any;
  message:any;
  successMessage:any;
  searchForm: any ={};
  isRepportProduce: boolean = false;
  navigationParams: any={};
  form: any ={};
  selectedItem: any ={};
  p:number=1;
  term: string='';


  constructor(private mensualiteService: MensualiteService, private route: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
this.activatedRoute.queryParams.subscribe(params => {
      console.log(params['values']);
      if(params['values']){
        console.log('im not free');
      this.navigationParams = JSON.parse(params['values']);
      }
      console.log('------- jai charger le navigation ------');
      console.log(this.navigationParams);
      this.loadByDate(this.navigationParams );
    });
    this.init();

  }


  init(){
    this.form = new FormGroup({
      numeroBodereau: new FormControl(''),
      date: new FormControl(null),
      montant: new FormControl('')
    });

    this.searchForm = new FormGroup({
      date: new FormControl(null),
      value: new FormControl('')
    });
    
  }
  

  onSubmitSearch(){
    const searchValue = {date:this.searchForm.get('date').value}
    const searchNavigationExtras: NavigationExtras = {
      queryParams:{
        'values':JSON.stringify(searchValue)
      }
    }
    this.route.navigate(['/admin/payments/search'], searchNavigationExtras);
    
  }

  loadByDate(form:any){
    console.log(form);
    
    this.mensualiteService.findAllByDate(form.date).subscribe(
      data =>{
        this.mensualites = data.lists;
        this.montantImpayer = data.montantImpayer;
        this.montantPayer = data.montantPayer;
        this.montantTotal = data.montantTotal;
        console.log(data);
        if(this.mensualites.length < 1){
         this.message = 'Aucun resultat trouve pour votre recherche';
        }
      },
      error =>{
        console.log(error);
      }
    );
  }



  generateRepport(){
    const formData = this.navigationParams;
    console.log(formData);
    this.mensualiteService.generateRepport(formData.date).subscribe(
      data =>{
        this.isRepportProduce = true;
        console.log('Je viens d\'entrer ');
        console.log('Je suis sortie');
        console.log(this.isRepportProduce);
        this.successMessage = 'Operation reussie';
        Swal.fire('Thank you....', 'You have generated your repport successfuly', 'success')
        
          
         
      },
      error =>{
        console.log(error);
        Swal.fire('Ooops....', 'Internal error occured while generating repport', 'error')
      }
    );
  }

  downloadRepport(){
    this.mensualiteService.printRepport().subscribe(
      data =>{
        console.log('Download successfuly');
      },
      error =>{
        console.log('Download Failed');
        console.log(error);
      }
    );
  }


  paymentForm(item:any){
    this.selectedItem = item;
    this.clickButton('openMensualiteForm');
  }

  onSubmit(numContrat:any){
    const formData = {
      numeroBodereau: this.form.get('numeroBodereau').value,
      montant: this.form.get('montant').value,
      date: this.form.get('date').value
    }

    console.log(numContrat);
    this.mensualiteService.update(formData,numContrat).subscribe(
      data =>{
        console.log(data);
        
        this.clickButton('new-mensualite-close');
        Swal.fire('Thank you....', 'You have made un payment successfuly', 'success')
        .then((result)=>{
          if(result.isConfirmed){
            this.loadByDate(this.navigationParams);
          }
        })
      },
      error =>{
        console.log(error);
        Swal.fire('Ooops....', 'Internal errors occured while doing payment', 'error');
      }
    );
  }

   clickButton(buttonId: string): void {
    document.getElementById(buttonId)?.click();
  }

}
