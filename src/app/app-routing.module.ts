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
import {RootRepresentationAddComponent} from './root/root-representation-add/root-representation-add.component';
import {RootRepresentationUpdateComponent} from './root/root-representation-update/root-representation-update.component';
import {RootRepresentationLocaleAddComponent} from './root/root-representation/root-representation-locale-add/root-representation-locale-add.component';
import {RootRepresentationLocaleUpdateComponent} from './root/root-representation/root-representation-locale-update/root-representation-locale-update.component';
import {RootRepresentationLocaleDetailComponent} from './root/root-representation/root-representation-locale-detail/root-representation-locale-detail.component';
import {RootRepresentationLocaleContratAddComponent} from './root/root-representation/root-representation-locale-detail/root-representation-locale-contrat-add/root-representation-locale-contrat-add.component';
import {RootRepresentationLocaleContratUpdateComponent} from './root/root-representation/root-representation-locale-detail/root-representation-locale-contrat-update/root-representation-locale-contrat-update.component';
import {RootRepresentationLocaleContratDetailComponent} from './root/root-representation/root-representation-locale-detail/root-representation-locale-contrat-detail/root-representation-locale-contrat-detail.component';
import {RootLocaleComponent} from './root/root-locale/root-locale.component';
import {RootLocaleContratDetailComponent} from './root/root-locale-detail/root-locale-contrat-detail/root-locale-contrat-detail.component';
import {RootLocaleDetailComponent} from './root/root-locale-detail/root-locale-detail.component';
import {RootLocaleUpdateComponent} from './root/root-locale-update/root-locale-update.component';
import {RootLocaleContratUpdateComponent} from './root/root-locale-detail/root-locale-contrat-update/root-locale-contrat-update.component';
import {RootContratComponent} from './root/root-contrat/root-contrat.component';
import {RootContratUpdateComponent} from './root/root-contrat-update/root-contrat-update.component';
import {RootContratDetailComponent} from './root/root-contrat-detail/root-contrat-detail.component';
import {RootClientComponent} from './root/root-client/root-client.component';

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
    path: 'root-representation-add', component: RootRepresentationAddComponent
  },
  {
    path: 'root-representation-update/:id', component: RootRepresentationUpdateComponent
  },
  {
    path: 'root-representation-locale-add/:id', component: RootRepresentationLocaleAddComponent
  },
  {
    path: 'root-representation-locale-detail/:id', component: RootRepresentationLocaleDetailComponent
  },
  {
    path: 'root-representation-locale-update/:id', component: RootRepresentationLocaleUpdateComponent
  },
  {
    path: 'root-representation-locale-contrat-add/:id', component: RootRepresentationLocaleContratAddComponent
  },
  {
    path: 'root-representation-locale-contrat-update/:id', component: RootRepresentationLocaleContratUpdateComponent
  },
  {
    path: 'root-representation-locale-contrat-detail/:id', component: RootRepresentationLocaleContratDetailComponent
  },
  {
    path: 'update/:id', component: UpdateRepresentationComponent
  },
  {
    path: 'root-locales', component: RootLocaleComponent
  },
  {
    path: 'root-locale-detail/:id', component: RootLocaleDetailComponent
  },
  {
    path: 'root-locale-update/:id', component: RootLocaleUpdateComponent
  },
  {
    path: 'root-locale-contrat-update/:id', component: RootLocaleContratUpdateComponent
  },
  {
    path: 'root-contrat-detail/:id', component: RootContratDetailComponent
  },
  {
    path: 'root-contrat-update/:id', component: RootContratUpdateComponent
  },
  {
    path: 'root-locale-contrat-detail/:id', component: RootLocaleContratDetailComponent
  },
  {
    path: 'root-contrats', component: RootContratComponent
  }
,
  {
    path: 'root-clients', component: RootClientComponent
  }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
