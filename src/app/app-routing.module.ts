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

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'admin/locations', component: RepresentationsComponent, canActivate:[AuthenticationGuard] },
  { path: 'admin/locations/detail/:id', component: OccupationsComponent, canActivate:[AuthenticationGuard]},
  { path: 'admin/occupation/contrats/:id', component: RepresentationLocaleContratComponent, canActivate:[AuthenticationGuard]},
  { path: 'admin/contrats', component: ContratsComponent, canActivate:[AuthenticationGuard]},
  { path: 'admin/contrats/detail/:id', component: ContratDetailComponent, canActivate:[AuthenticationGuard]},
  { path: 'admin/clients', component: ClientsComponent, canActivate:[AuthenticationGuard]},
  { path: 'admin/payments', component: PaymentsComponent, canActivate:[AuthenticationGuard]},
  { path: 'admin/payments/search', component: PaymentsSearchComponent, canActivate:[AuthenticationGuard]},
  { path: 'admin/users', component: UsersComponent, canActivate:[AuthenticationGuard]},
  { path: 'admin/user/detail/:id', component: UserDetailComponent, canActivate:[AuthenticationGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
