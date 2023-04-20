import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoTorneoComponent } from './listado-torneo/listado-torneo.component';
import { DetallesTorneoComponent } from './detalles-torneo/detalles-torneo.component';
import { RegistroTorneoComponent } from './registro-torneo/registro-torneo.component';
import { ModificarTorneoComponent } from './modificar-torneo/modificar-torneo.component';

const routes: Routes = [
  { path: 'listado', component: ListadoTorneoComponent },
  { path: 'registrar', component: RegistroTorneoComponent },
  {
    path: 'detalles/:torneoId',
    component: DetallesTorneoComponent,
  },
  {
    path: 'modificar/:torneoId',
    component: ModificarTorneoComponent,
  },
  {
    path: '',
    redirectTo: 'listado',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TorneoRoutingModule {}
