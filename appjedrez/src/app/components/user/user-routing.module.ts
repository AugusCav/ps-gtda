import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dash/dashboard/dashboard.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ResumenComponent } from './dash/resumen/resumen.component';
import { PartidasComponent } from './dash/partidas/partidas.component';
import { ConfiguracionComponent } from './dash/configuracion/configuracion.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [() => inject(AuthGuard).canActivateLog()],
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [() => inject(AuthGuard).canActivateLog()],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [() => inject(AuthGuard).canActivate()],
    children: [
      { path: 'resumen', component: ResumenComponent },
      { path: 'partidas', component: PartidasComponent },
      { path: 'configuracion', component: ConfiguracionComponent },
      { path: '', redirectTo: 'resumen', pathMatch: 'full' },
    ],
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
