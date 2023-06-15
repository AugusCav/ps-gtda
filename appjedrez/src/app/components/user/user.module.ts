import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dash/dashboard/dashboard.component';
import { SharedModule } from 'src/app/shared/shared-module/shared.module';
import { ResumenComponent } from './dash/resumen/resumen.component';
import { PartidasComponent } from './dash/partidas/partidas.component';
import { ConfiguracionComponent } from './dash/configuracion/configuracion.component';
import { NgChartsModule } from 'ng2-charts';
import { ConfigOrganizadoresComponent } from './dash/config-organizadores/config-organizadores.component';
import { PerfilComponent } from './perfiles/perfil/perfil.component';
import { TorneosOrganizadorComponent } from './dash/torneos-organizador/torneos-organizador.component';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    ResumenComponent,
    PartidasComponent,
    ConfiguracionComponent,
    ConfigOrganizadoresComponent,
    PerfilComponent,
    TorneosOrganizadorComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    NgChartsModule,
  ],
})
export class UserModule {}
