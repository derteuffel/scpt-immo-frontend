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
  isAdminTest: boolean = false;
  isDSI = false;
  isROOT = false;
  isFinance: boolean = false;
  isProvincial: boolean = false;
  isComptabilite: boolean = false;
  isDgi: boolean = false;
  roles: string[] = [];

  constructor(private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router) { }

  ngOnInit(): void {
    if (this.authService.currentUserValue.token) {
      this.isConnected = true;
      this.user = this.authService.currentUserValue;
      switch(this.user.role+''){
        case "ROOT":{
          this.isROOT = true;
          break;
        }
        case 'POSTE_FINANCE':{
          this.isFinance = true;
          break;
        }
        case 'PROVINCIAL':{
          this.isProvincial = true;
          break;
        }
        case 'FINANCE':{
          this.isComptabilite = true;
          break;
        }
        
        case 'DSI':{
          this.isDSI = true;
          break;
        }
        case 'MANAGER':{
          this.isAdminTest = true;
          break;
        }
        case 'DGI':{
          this.isDgi = true;
          break;
        }
        case 'AGENT':{
          this.isDgi = true;
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
