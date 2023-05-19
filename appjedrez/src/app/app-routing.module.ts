import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { TerminosCondicionesComponent } from './components/extra/terminos-condiciones/terminos-condiciones.component';
import { FaqComponent } from './components/extra/faq/faq.component';

const routes: Routes = [
  {
    path: 'user',
    loadChildren: () =>
      import('./components/user/user.module').then((m) => m.UserModule),
  },
  { path: 'inicio', component: InicioComponent },
  {
    path: 'app',
    loadChildren: () =>
      import('./components/aplicacion/aplicacion.module').then(
        (m) => m.AplicacionModule
      ),
  },
  { path: 'terminos-condiciones', component: TerminosCondicionesComponent },
  { path: 'faq', component: FaqComponent },
  {
    path: '**',
    redirectTo: 'inicio',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
