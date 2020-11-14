import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListRepresentationComponent} from './views/representation/list-representation/list-representation.component';
import {EnregistrementRepresentationComponent} from './views/representation/enregistrement-representation/enregistrement-representation.component';
import {DetailRepresentationComponent} from './views/representation/detail-representation/detail-representation.component';
import {UpdateRepresentationComponent} from './views/representation/update-representation/update-representation.component';
import {EnregistrementLocalComponent} from './views/local/enregistrement-local/enregistrement-local.component';
import {LocalComponent} from './views/local/local/local.component';
import {RootHomeComponent} from './root/root-home/root-home.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {RootRepresentationComponent} from './root/root-representation/root-representation.component';

const routes: Routes = [
  {
    path: 'root-home', component: RootHomeComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'root-representation/:id', component: RootRepresentationComponent
  },
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: 'list-representation', component: ListRepresentationComponent
  },
  {
    path: 'add', component: EnregistrementRepresentationComponent
  },
  {
    path: 'detail/:id', component: DetailRepresentationComponent
  },
  {
    path: 'update/:id', component: UpdateRepresentationComponent
  },
  {
    path: 'add-local', component: EnregistrementLocalComponent
  },
  {
    path: 'local', component: LocalComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
