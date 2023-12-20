import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './game/game.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { DetallesGameComponent } from './detalles-game/detalles-game.component';
import { VerComponent } from './ver/ver.component';

const routes: Routes = [
  {
    path: ':idPartida',
    component: GameComponent,
    canActivate: [() => inject(AuthGuard).canActivate()],
    children: [
      {
        path: 'detalles',
        component: DetallesGameComponent,
      },
      {
        path: 'ver',
        component: VerComponent,
      },
      { path: '', redirectTo: 'detalles', pathMatch: 'full' },
    ],
  },
  { path: '', redirectTo: ':idPartida', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GameRoutingModule {}
