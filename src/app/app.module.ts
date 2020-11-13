import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RootHomeComponent } from './root/root-home/root-home.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import { RootRepresentationComponent } from './root/root-representation/root-representation.component';
import { RootRepresentationUpdateComponent } from './root/root-representation-update/root-representation-update.component';

const routes: Routes = [
  { path: 'root-home', component: RootHomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'root-representation/:id', component: RootRepresentationComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    RootHomeComponent,
    RootRepresentationComponent,
    RootRepresentationUpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
