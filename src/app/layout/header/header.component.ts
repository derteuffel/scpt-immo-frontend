import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { User } from 'src/app/models/user';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  roles?: string[];
  isConnected?: boolean;
  user?: User;

  constructor(private authService: AuthService,
    private tokenService: TokenService,
    private router: Router) { }

  ngOnInit(): void {
    if (this.authService.currentUserValue.token) {
      this.isConnected = true;
      this.user = this.authService.currentUserValue;
    }else{
      this.isConnected = false;
    }
  }

  logout(){
    this.tokenService.setUserLoggedIn("false");
    this.authService.logOut();
    this.router.navigateByUrl('/login');
  }

}
