import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Role } from 'src/app/enums/role.enum';

import { User } from 'src/app/models/user';
import { NotificationService } from 'src/app/services/notification.service';
import { AuthService } from '../auth.service';
import { TokenStorageService } from '../token-storage.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
  export class LoginComponent implements OnInit {

    form: any = {};
    isLoggedIn = false;
    isLoginFailed = false;
    errorMessage = '';
    role!: string;
    constructor(private authService: AuthService,
      private router: Router, private tokenService:TokenService) { }

  ngOnInit(): void {

    console.log(this.authService.getUserToken());
    if(this.authService.getUserToken() != null){
      this.tokenService.setUserLoggedIn("true");
      console.log(this.authService.currentUserO.role+'');
      if(this.authService.currentUserO.role+'' === "POSTE_FINANCE" || this.authService.currentUserO.role+'' === "COMPTABILITE"){
        console.log(this.authService.currentUserO.role+' 1');
        this.router.navigateByUrl("/admin/payments");
      }else{
        console.log(this.authService.currentUserO.role+' 2');
        this.router.navigateByUrl("/admin/locations")
      }
    }

  }



  onSubmit() {
    console.log(this.form);
    const formData = {
      username: this.form.username,
      password: this.form.password
    }
    this.authService.login(formData).subscribe(

    data => {
      console.log(data);
      const type = data.type;
      if (typeof type === 'undefined'){
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.tokenService.setUserLoggedIn("true");
        localStorage.setItem('id', this.authService.currentUserValue.id + '');
        this.role = this.authService.currentUserValue.role.toString();
      
        if(this.role === "POSTE_FINANCE" || this.role === "COMPTABILITE"){
          this.router.navigateByUrl("/admin/payments");
        }else{
          this.router.navigateByUrl("/admin/locations");
        }
      }

    // this.reloadPage();
    },
    error => {
    console.log(error);
    this.errorMessage = error.error.message;
    this.isLoginFailed = true;
    }
  );
}

}
