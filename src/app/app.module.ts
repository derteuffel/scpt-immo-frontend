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
import { LocaleContratMensualitesComponent } from './body/representation/locale/locale-contrat-mensualites/locale-contrat-mensualites.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { PaymentsComponent } from './body/home/payments/payments.component';

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
    LocaleContratMensualitesComponent,
    PaymentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    Ng2SearchPipeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
