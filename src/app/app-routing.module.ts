import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { ClientsComponent } from './body/home/clients/clients.component';
import { ContratsComponent } from './body/home/contrats/contrats.component';
import { PaymentsComponent } from './body/home/payments/payments.component';
import { RepresentationsComponent } from './body/home/representations/representations.component';
import { RepresentationLocaleContratComponent } from './body/representation/representation-locale-contrat/representation-locale-contrat.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'admin/locaux', component: RepresentationsComponent },
  { path: 'admin/representation/locales/detail/:id', component: RepresentationLocaleContratComponent },
  { path: 'admin/contrats', component: ContratsComponent },
  { path: 'admin/clients', component: ClientsComponent },
  { path: 'admin/payments', component: PaymentsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
