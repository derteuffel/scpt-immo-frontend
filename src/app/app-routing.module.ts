import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './auth/authentication.guard';
import { LoginComponent } from './auth/login/login.component';
import { ClientsComponent } from './body/home/clients/clients.component';
import { ContratsComponent } from './body/home/contrats/contrats.component';
import { PaymentsSearchComponent } from './body/home/payments-search/payments-search.component';
import { PaymentsComponent } from './body/home/payments/payments.component';
import { RepresentationsComponent } from './body/home/representations/representations.component';
import { UserDetailComponent } from './body/home/user-detail/user-detail.component';
import { UsersComponent } from './body/home/users/users.component';
import { ContratDetailComponent } from './body/representation/contrat-detail/contrat-detail.component';
import { OccupationsComponent } from './body/representation/occupations/occupations.component';
import { RepresentationLocaleContratComponent } from './body/representation/representation-locale-contrat/representation-locale-contrat.component';
import {BordereauxComponent} from "./body/home/bordereaux/bordereaux.component";
import {DossierDetailsComponent} from "./body/representation/dossier-details/dossier-details.component";
import {DossiersComponent} from "./body/home/dossiers/dossiers.component";
import { StatistiquesComponent } from './body/home/statistiques/statistiques.component';
import { LogsComponent } from './body/home/logs/logs.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'admin/locations', component: RepresentationsComponent, canActivate:[AuthenticationGuard] },
  { path: 'admin/locations/detail/:id', component: OccupationsComponent, canActivate:[AuthenticationGuard]},
  { path: 'admin/occupation/contrats/:id', component: RepresentationLocaleContratComponent, canActivate:[AuthenticationGuard]},
  { path: 'admin/contrats', component: ContratsComponent, canActivate:[AuthenticationGuard]},
  { path: 'admin/dossiers', component: DossiersComponent, canActivate:[AuthenticationGuard]},
  { path: 'admin/statistiques', component: StatistiquesComponent, canActivate:[AuthenticationGuard]},
  { path: 'admin/contrats/detail/:id', component: ContratDetailComponent, canActivate:[AuthenticationGuard]},
  { path: 'admin/dossier/detail/:id', component: DossierDetailsComponent, canActivate:[AuthenticationGuard]},
  { path: 'admin/factures', component: BordereauxComponent, canActivate:[AuthenticationGuard]},
  { path: 'admin/payments', component: PaymentsComponent, canActivate:[AuthenticationGuard]},
  { path: 'admin/payments/search', component: PaymentsSearchComponent, canActivate:[AuthenticationGuard]},
  { path: 'admin/users', component: UsersComponent, canActivate:[AuthenticationGuard]},
  { path: 'admin/logs', component: LogsComponent, canActivate:[AuthenticationGuard]},
  { path: 'admin/user/detail/:id', component: UserDetailComponent, canActivate:[AuthenticationGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
