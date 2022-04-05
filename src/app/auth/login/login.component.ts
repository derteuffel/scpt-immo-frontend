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
    role?: Role;
    constructor(private authService: AuthService,
      private router: Router) { }

  ngOnInit(): void {

  }
  onSubmit() {
    console.log(this.form);
    const formData = {
      username: this.form.username,
      password: this.form.password
    }
    this.authService.login(formData).subscribe(

    data => {
      console.log(' login action');
      console.log(data);
      const type = data.type;
      console.log(type);
      if (typeof type === 'undefined'){
      this.isLoginFailed = false;
      this.isLoggedIn = true;
      localStorage.setItem('id', this.authService.currentUserValue.id + '');
      this.role = this.authService.currentUserValue.role;
      switch(this.role){
        case Role.PAYMENT:
          this.router.navigate(["/admin/payments"]);
          break;
        
        default: 
          this.router.navigate(["/admin/locaux"]);
      }
      console.log(this.role);
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
