import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TorneoRoutingModule } from './torneo-routing.module';
import { ListadoTorneoComponent } from './listado-torneo/listado-torneo.component';
import { DetallesTorneoComponent } from './detalles-torneo/detalles-torneo.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegistroTorneoComponent } from './registro-torneo/registro-torneo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModificarTorneoComponent } from './modificar-torneo/modificar-torneo.component';

@NgModule({
  declarations: [
    ListadoTorneoComponent,
    DetallesTorneoComponent,
    RegistroTorneoComponent,
    ModificarTorneoComponent,
  ],
  imports: [
    CommonModule,
    TorneoRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class TorneoModule {}
