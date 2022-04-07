import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { Role } from 'src/app/enums/role.enum';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  isConnected?: boolean;
  user?: User;
  errorMessage = '';
  isAdminTest?: boolean;
  roles: string[] = [];

  constructor(private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router) { }

  ngOnInit(): void {
    if (this.authService.currentUserValue.token) {
      this.isConnected = true;
      this.user = this.authService.currentUserValue;
      switch(this.user.role){
        case Role.ROOT:{
          this.isAdminTest = true;
          break;
        }
        case Role.DSI:{
          this.isAdminTest = true;
          break;
        }
        default:{
          break;
        }
      }
      console.log(this.isAdminTest);
    }else{
      this.isConnected = false;
    }
    
  }

  

}
