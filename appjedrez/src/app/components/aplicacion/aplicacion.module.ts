import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AplicacionComponent } from './aplicacion/aplicacion.component';
import { GameModule } from '../game/game.module';
import { AplicacionRoutingModule } from './aplicacion-routing.module';
import { TorneoModule } from '../torneo/torneo.module';
import { NavbarComponent } from '../../shared/shared-module/navbar/navbar.component';
import { SharedModule } from 'src/app/shared/shared-module/shared.module';

@NgModule({
  declarations: [AplicacionComponent],
  imports: [
    CommonModule,
    AplicacionRoutingModule,
    GameModule,
    TorneoModule,
    SharedModule,
  ],
})
export class AplicacionModule {}
