import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'game',
    loadChildren: () =>
      import('./components/game/game.module').then((m) => m.GameModule),
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./components/user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'torneo',
    loadChildren: () =>
      import('./components/torneo/torneo.module').then((m) => m.TorneoModule),
  },
  {
    path: '**',
    redirectTo: 'user',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
