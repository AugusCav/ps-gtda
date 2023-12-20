import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TorneoRoutingModule } from './torneo-routing.module';
import { ListadoTorneoComponent, NgbdSortableHeader } from './listado-torneo/listado-torneo.component';
import { DetallesTorneoComponent } from './detalles/detalles-torneo/detalles-torneo.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegistroTorneoComponent } from './registro-torneo/registro-torneo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModificarTorneoComponent } from './modificar-torneo/modificar-torneo.component';
import { DetallesParticipanteComponent } from './detalles/detalles-participante/detalles-participante.component';
import { DetalleComponent } from './detalles/detalle/detalle.component';
import { ListadoParticipantesComponent } from './detalles/listado-participantes/listado-participantes.component';
import { ListadoInscripcionesComponent } from './detalles/listado-inscripciones/listado-inscripciones.component';
import { RondasComponent } from './detalles/rondas/rondas.component';
import { PartidasComponent } from './detalles/partidas/partidas.component';
import { ListadoPartidasComponent } from './detalles/listado-partidas/listado-partidas.component';
import { SharedModule } from 'src/app/shared/shared-module/shared.module';

@NgModule({
  declarations: [
    ListadoTorneoComponent,
    DetallesTorneoComponent,
    RegistroTorneoComponent,
    ModificarTorneoComponent,
    DetallesParticipanteComponent,
    DetalleComponent,
    ListadoParticipantesComponent,
    ListadoInscripcionesComponent,
    RondasComponent,
    PartidasComponent,
    ListadoPartidasComponent,
    NgbdSortableHeader,
  ],
  imports: [
    CommonModule,
    TorneoRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
  ],
})
export class TorneoModule {}
