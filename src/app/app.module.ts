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
    DetailLocalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
