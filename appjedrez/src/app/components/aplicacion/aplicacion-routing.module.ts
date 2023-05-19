import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AplicacionComponent } from './aplicacion/aplicacion.component';

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
