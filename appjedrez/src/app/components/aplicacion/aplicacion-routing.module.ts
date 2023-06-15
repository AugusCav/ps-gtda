import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AplicacionComponent } from './aplicacion/aplicacion.component';
import { InscripcionOrgComponent } from './inscripcion-org/inscripcion-org.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { PagosComponent } from './pagos/pagos.component';
import { SuccessComponent } from './back-urls/success/success.component';
import { FailureComponent } from './back-urls/failure/failure.component';

const routes: Routes = [
  {
    path: '',
    component: AplicacionComponent,
    children: [
      {
        path: 'torneo',
        loadChildren: () =>
          import('../torneo/torneo.module').then((m) => m.TorneoModule),
      },
      {
        path: 'game',
        loadChildren: () =>
          import('../game/game.module').then((m) => m.GameModule),
      },
      {
        path: 'organizadores',
        component: InscripcionOrgComponent,
        canActivate: [() => inject(AuthGuard).canActivate()],
      },
      { path: 'pagos', component: PagosComponent },
      { path: 'success', component: SuccessComponent },
      { path: 'failure', component: FailureComponent },
      {
        path: '',
        redirectTo: 'torneo',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AplicacionRoutingModule {}
