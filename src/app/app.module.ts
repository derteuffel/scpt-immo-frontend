import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { RepresentationsComponent } from './body/home/representations/representations.component';
import { ContratsComponent } from './body/home/contrats/contrats.component';
import { UsersComponent } from './body/home/users/users.component';
import { RepresentationLocaleContratComponent } from './body/representation/representation-locale-contrat/representation-locale-contrat.component';
import { RepresentationUsersComponent } from './body/representation/representation-users/representation-users.component';
import { ClientsComponent } from './body/home/clients/clients.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { PaymentsComponent } from './body/home/payments/payments.component';
import { PaymentsSearchComponent } from './body/home/payments-search/payments-search.component';
import { ContratDetailComponent } from './body/representation/contrat-detail/contrat-detail.component';
import { OccupationsComponent } from './body/representation/occupations/occupations.component';
import { NotificationService } from './services/notification.service';
import { AuthenticationGuard } from './auth/authentication.guard';
import { AuthService } from './auth/auth.service';
import { LocaleService } from './services/locale.service';
import { OccupationService } from './services/occupation.service';
import { ContratService } from './services/contrat.service';
import { MensualiteService } from './services/mensualite.service';
import { NotificationModule } from './notification.module';
import { UserDetailComponent } from './body/home/user-detail/user-detail.component';
import {DatePipe} from "@angular/common";
import {BordereauxComponent} from "./body/home/bordereaux/bordereaux.component";
import { DossierDetailsComponent } from './body/representation/dossier-details/dossier-details.component';
import { DossiersComponent } from './body/home/dossiers/dossiers.component';
import {NgChartsModule} from "ng2-charts";
import { StatistiquesComponent } from './body/home/statistiques/statistiques.component';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SidebarComponent,
    FooterComponent,
    HeaderComponent,
    RepresentationsComponent,
    ContratsComponent,
    UsersComponent,
    RepresentationLocaleContratComponent,
    RepresentationUsersComponent,
    ClientsComponent,
    PaymentsComponent,
    PaymentsSearchComponent,
    ContratDetailComponent,
    OccupationsComponent,
    UserDetailComponent,
    BordereauxComponent,
    DossierDetailsComponent,
    DossiersComponent,
    StatistiquesComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    NgChartsModule
    ],
  providers: [DatePipe,{provide:JWT_OPTIONS,useValue:JWT_OPTIONS},JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
