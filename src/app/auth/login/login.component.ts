import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
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
  roles: string[] = [];

  constructor(private authService: AuthService,
            private tokenStorage: TokenStorageService,
            private router: Router) { }

  ngOnInit(): void {

    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().authorities;
      this.router.navigateByUrl('admin/representations');
    }
    this.init();
  }

  init(){
    this.form = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
    });
  }

  onSubmit(){
    const formData ={
      username: this.form.get('username').value,
      password: this.form.get('password').value
    };
    this.authService.login(formData).subscribe(
      data =>{
        this.tokenStorage.saveToken(data.accessToken);
        console.log(data.accessToken)
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().authorities;
        console.log(this.tokenStorage.getUser());
        this.router.navigateByUrl('admin/representations');
      },
      error =>{
        this.errorMessage = error.error.message;
        this.isLoginFailed = true;
      }
    );
  }

}
