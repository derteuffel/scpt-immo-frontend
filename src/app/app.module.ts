import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RootHomeComponent } from './root/root-home/root-home.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import { RootRepresentationComponent } from './root/root-representation/root-representation.component';
import { RootRepresentationUpdateComponent } from './root/root-representation-update/root-representation-update.component';
import { LocalComponent } from './views/local/local/local.component';
import { EnregistrementLocalComponent } from './views/local/enregistrement-local/enregistrement-local.component';
import { EnregistrementRepresentationComponent } from './views/representation/enregistrement-representation/enregistrement-representation.component';
import { ListRepresentationComponent } from './views/representation/list-representation/list-representation.component';
import { DetailRepresentationComponent } from './views/representation/detail-representation/detail-representation.component';
import { UpdateRepresentationComponent } from './views/representation/update-representation/update-representation.component';
import { DetailLocalComponent } from './views/local/detail-local/detail-local.component';
import { RootRepresentationAddComponent } from './root/root-representation-add/root-representation-add.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import { RootRepresentationLocaleAddComponent } from './root/root-representation/root-representation-locale-add/root-representation-locale-add.component';
import { RootRepresentationLocaleUpdateComponent } from './root/root-representation/root-representation-locale-update/root-representation-locale-update.component';
import { RootRepresentationLocaleDetailComponent } from './root/root-representation/root-representation-locale-detail/root-representation-locale-detail.component';
import { RootRepresentationLocaleContratAddComponent } from './root/root-representation/root-representation-locale-detail/root-representation-locale-contrat-add/root-representation-locale-contrat-add.component';
import { RootRepresentationLocaleContratUpdateComponent } from './root/root-representation/root-representation-locale-detail/root-representation-locale-contrat-update/root-representation-locale-contrat-update.component';
import { RootRepresentationLocaleContratDetailComponent } from './root/root-representation/root-representation-locale-detail/root-representation-locale-contrat-detail/root-representation-locale-contrat-detail.component';
import { RootLocaleComponent } from './root/root-locale/root-locale.component';
import {RootLocaleDetailComponent} from './root/root-locale-detail/root-locale-detail.component';
import {RootLocaleUpdateComponent} from './root/root-locale-update/root-locale-update.component';
import {RootLocaleContratUpdateComponent} from './root/root-locale-detail/root-locale-contrat-update/root-locale-contrat-update.component';
import {RootLocaleContratDetailComponent} from './root/root-locale-detail/root-locale-contrat-detail/root-locale-contrat-detail.component';
import { RootContratComponent } from './root/root-contrat/root-contrat.component';
import {RootContratDetailComponent} from './root/root-contrat-detail/root-contrat-detail.component';
import {RootContratUpdateComponent} from './root/root-contrat-update/root-contrat-update.component';
import { RootClientComponent } from './root/root-client/root-client.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    RootHomeComponent,
    RootRepresentationComponent,
    RootRepresentationUpdateComponent,
    LocalComponent,
    EnregistrementLocalComponent,
    EnregistrementRepresentationComponent,
    ListRepresentationComponent,
    DetailRepresentationComponent,
    UpdateRepresentationComponent,
    DetailLocalComponent,
    RootRepresentationAddComponent,
    RootRepresentationLocaleAddComponent,
    RootRepresentationLocaleUpdateComponent,
    RootRepresentationLocaleDetailComponent,
    RootRepresentationLocaleContratAddComponent,
    RootRepresentationLocaleContratUpdateComponent,
    RootRepresentationLocaleContratDetailComponent,
    RootLocaleComponent,
    RootLocaleDetailComponent,
    RootLocaleUpdateComponent,
    RootLocaleContratUpdateComponent,
    RootLocaleContratDetailComponent,
    RootContratComponent,
    RootContratDetailComponent,
    RootContratUpdateComponent,
    RootClientComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
