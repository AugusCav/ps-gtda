import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dash/dashboard/dashboard.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ResumenComponent } from './dash/resumen/resumen.component';
import { PartidasComponent } from './dash/partidas/partidas.component';
import { ConfiguracionComponent } from './dash/configuracion/configuracion.component';
import { ConfigOrganizadoresComponent } from './dash/config-organizadores/config-organizadores.component';
import { PerfilComponent } from './usuario/perfil/perfil.component';

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
      { path: 'config-organizadores', component: ConfigOrganizadoresComponent },
      { path: '', redirectTo: 'configuracion', pathMatch: 'full' },
    ],
  },
  {
    path: 'perfil/:idUsuario',
    component: PerfilComponent,
    canActivate: [() => inject(AuthGuard).canActivate()],
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
