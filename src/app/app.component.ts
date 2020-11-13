import { Component } from '@angular/core';
import {TokenStorageService} from './_services/token-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'scpt-immo';

  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showRootBoard = false;
  username: string;

  constructor(private tokenStorageService: TokenStorageService, private router: Router){}

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const account = this.tokenStorageService.getUser();
      this.roles = account.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showRootBoard = this.roles.includes('ROLE_ROOT');

      this.username = account.username;
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    this.router.navigateByUrl('/login');
  }
}
