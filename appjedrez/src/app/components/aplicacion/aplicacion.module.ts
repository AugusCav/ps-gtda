import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AplicacionComponent } from './aplicacion/aplicacion.component';
import { GameModule } from '../game/game.module';
import { AplicacionRoutingModule } from './aplicacion-routing.module';
import { TorneoModule } from '../torneo/torneo.module';
import { NavbarComponent } from '../../shared/shared-module/navbar/navbar.component';
import { SharedModule } from 'src/app/shared/shared-module/shared.module';
import { InscripcionOrgComponent } from './inscripcion-org/inscripcion-org.component';
import { PagosComponent } from './pagos/pagos.component';
import { SuccessComponent } from './back-urls/success/success.component';
import { FailureComponent } from './back-urls/failure/failure.component';

@NgModule({
  declarations: [AplicacionComponent, InscripcionOrgComponent, PagosComponent, SuccessComponent, FailureComponent],
  imports: [
    CommonModule,
    AplicacionRoutingModule,
    GameModule,
    TorneoModule,
    SharedModule,
  ],
})
export class AplicacionModule {}
