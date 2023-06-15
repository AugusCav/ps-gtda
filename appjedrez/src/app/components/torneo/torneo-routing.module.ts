import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoTorneoComponent } from './listado-torneo/listado-torneo.component';
import { DetallesTorneoComponent } from './detalles/detalles-torneo/detalles-torneo.component';
import { RegistroTorneoComponent } from './registro-torneo/registro-torneo.component';
import { ModificarTorneoComponent } from './modificar-torneo/modificar-torneo.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { DetallesParticipanteComponent } from './detalles/detalles-participante/detalles-participante.component';
import { DetalleComponent } from './detalles/detalle/detalle.component';
import { ListadoParticipantesComponent } from './detalles/listado-participantes/listado-participantes.component';
import { ListadoInscripcionesComponent } from './detalles/listado-inscripciones/listado-inscripciones.component';
import { RondasComponent } from './detalles/rondas/rondas.component';
import { PartidasComponent } from './detalles/partidas/partidas.component';
import { ListadoPartidasComponent } from './detalles/listado-partidas/listado-partidas.component';

const routes: Routes = [
  {
    path: 'listado',
    component: ListadoTorneoComponent,
    canActivate: [() => inject(AuthGuard).canActivate()],
  },
  {
    path: 'registrar',
    component: RegistroTorneoComponent,
    canActivate: [() => inject(AuthGuard).canActivateOrg()],
  },
  {
    path: 'detalles/:torneoId',
    component: DetallesTorneoComponent,
    canActivate: [() => inject(AuthGuard).canActivate()],
    children: [
      {
        path: 'participante',
        component: DetallesParticipanteComponent,
      },
      {
        path: 'detalle',
        component: DetalleComponent,
      },
      {
        path: 'participantes',
        component: ListadoParticipantesComponent,
      },
      {
        path: 'inscriptos',
        component: ListadoInscripcionesComponent,
      },
      {
        path: 'rondas',
        component: RondasComponent,
      },
      {
        path: 'partidas',
        component: PartidasComponent,
      },
      { path: 'listado-partidas', component: ListadoPartidasComponent },
      {
        path: '',
        redirectTo: 'detalle',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'modificar/:torneoId',
    component: ModificarTorneoComponent,
    canActivate: [() => inject(AuthGuard).canActivateOrg()],
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TorneoRoutingModule {}
