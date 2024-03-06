import { Component, ViewChild } from '@angular/core';
import { TokenService } from './services/token.service';
import { Router } from '@angular/router';
import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { BsModalRef, BsModalService, ModalDirective } from 'ngx-bootstrap/modal';
import { BnNgIdleService } from 'bn-ng-idle';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'scpt-frontend';
  
  
  constructor( private router: Router, private bnIdle: BnNgIdleService, private tokenService: TokenService){
   
    
  }

  ngOnInit(){
   this.bnIdle.startWatching(180).subscribe((res) => {
                      if (res) {
                        if(this.tokenService.getUserLoggedIn().includes("true")){
                            alert("Veuillez vous reconnecter");
                            this.logout();
                          }  
                      }
                  });
    
  }

  

  logout() {
    this.tokenService.setUserLoggedIn("false");
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

    
}
